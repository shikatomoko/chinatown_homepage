// ナビゲーションHTML生成関数
function createNavigationHTML() {
    // 現在のパスを取得
    let currentPath = window.location.href || window.location.pathname || document.URL;
    
    // パス検出のロジック（複数の方法でフォルダ構造を判定）
    let linkPrefix = '';
    
    // Method 1: URL内のフォルダ名から判定
    if (currentPath.includes('characterpage') || currentPath.includes('shoppage') || currentPath.includes('world_detail')) {
        // 2階層深い（例：characterpage/red/character_aren.html, character_ss/ss_yellow1.html）
        linkPrefix = '../../';
    } else if (currentPath.includes('colorpage') || currentPath.includes('character_ss')) {
        // 1階層深い（例：colorpage/red.html）  
        linkPrefix = '../';
    } else {
        // Method 2: navigation.jsファイルの相対位置から判定
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            if (script.src && script.src.includes('navigation.js')) {
                const navPath = script.getAttribute('src') || script.src;
                if (navPath.includes('../../common/navigation.js')) {
                    linkPrefix = '../../';
                    break;
                } else if (navPath.includes('../common/navigation.js')) {
                    linkPrefix = '../';
                    break;
                } else if (navPath.includes('common/navigation.js') && !navPath.includes('../')) {
                    linkPrefix = '';
                    break;
                }
            }
        }
        
        // Method 3: HTMLファイル内のnavigation.cssリンクから判定（フォールバック）
        if (!linkPrefix) {
            const links = document.getElementsByTagName('link');
            for (let link of links) {
                if (link.href && link.href.includes('navigation.css')) {
                    const cssPath = link.getAttribute('href') || link.href;
                    if (cssPath.includes('../../common/navigation.css')) {
                        linkPrefix = '../../';
                        break;
                    } else if (cssPath.includes('../common/navigation.css')) {
                        linkPrefix = '../';
                        break;
                    } else if (cssPath.includes('common/navigation.css')) {
                        linkPrefix = '';
                        break;
                    }
                }
            }
        }
    }
    
    return createNavigationHTMLWithPrefix(linkPrefix);
}

// 指定されたプレフィックスでナビゲーションHTMLを生成
function createNavigationHTMLWithPrefix(linkPrefix) {
    return `
    <!-- ホバーメニュー -->
    <div class="hover-menu-container">
        <div class="menu-icon">☰</div>
        <div class="hover-menu">
            <a href="${linkPrefix}index.html" class="menu-item">ホーム</a>
            <a href="${linkPrefix}rules.html" class="menu-item">特殊ルール</a>
            <a href="${linkPrefix}jinngai.html" class="menu-item">人外設定</a>
            <a href="${linkPrefix}world.html" class="menu-item">世界観設定</a>
            <a href="${linkPrefix}characters.html" class="menu-item">キャラクター一覧</a>
            <a href="${linkPrefix}pc.html" class="menu-item">PC一覧</a>
            <a href="${linkPrefix}shops.html" class="menu-item">店舗一覧</a>
            <a href="${linkPrefix}ss_index.html" class="menu-item">断片集</a>
            <a href="${linkPrefix}tools.html" class="menu-item">ツール</a>
            <a href="${linkPrefix}story.html" class="menu-item">ストーリー</a>
            
            <div class="menu-divider"></div>
            
            <div class="submenu">
                <span class="menu-item">各街ホーム ▶</span>
                <div class="submenu-content">
                    <a href="${linkPrefix}colorpage/black.html" class="submenu-item color-black">黒</a>
                    <a href="${linkPrefix}colorpage/white.html" class="submenu-item color-white">白葬街</a>
                    <a href="${linkPrefix}colorpage/red.html" class="submenu-item color-red">呑紅街</a>
                    <a href="${linkPrefix}colorpage/blue.html" class="submenu-item color-blue">蒼殉街</a>
                    <a href="${linkPrefix}colorpage/green.html" class="submenu-item color-green">滲緑街</a>
                    <a href="${linkPrefix}colorpage/yellow.html" class="submenu-item color-yellow">黄惑街</a>
                </div>
            </div>
        </div>
    </div>
    `;
}

// モバイル対応のメニュー制御
function initMobileMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const hoverMenu = document.querySelector('.hover-menu');
    const submenu = document.querySelector('.submenu > .menu-item');
    const submenuContent = document.querySelector('.submenu-content');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hoverMenu.classList.toggle('show');
            if (submenuContent) submenuContent.classList.remove('show');
        });
    }
    
    if (submenu) {
        submenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            submenuContent.classList.toggle('show');
        });
    }
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.hover-menu-container')) {
            if (hoverMenu) hoverMenu.classList.remove('show');
            if (submenuContent) submenuContent.classList.remove('show');
        }
    });
}

// ナビゲーションを初期化する関数
function initNavigation() {
    // ナビゲーションプレースホルダーを見つける
    const placeholder = document.getElementById('navigation-placeholder');
    if (placeholder) {
        // プレースホルダーにナビゲーションHTMLを挿入
        placeholder.innerHTML = createNavigationHTML();
    } else {
        // プレースホルダーがない場合はbodyの最後に追加（後方互換性）
        document.body.insertAdjacentHTML('beforeend', createNavigationHTML());
    }
    
    // DOMContentLoadedイベントでモバイルメニューを初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
}