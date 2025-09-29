// ナビゲーションHTML生成関数
function createNavigationHTML(currentPath = '') {
    // 現在のパスに基づいてリンクのプレフィックスを決定
    const isInSubfolder = currentPath.includes('/');
    const linkPrefix = isInSubfolder ? '../' : '';
    
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
            <a href="${linkPrefix}tools.html" class="menu-item">ツール</a>
            
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
function initNavigation(currentPath = '') {
    // ナビゲーションHTMLを挿入
    document.body.insertAdjacentHTML('beforeend', createNavigationHTML(currentPath));
    
    // DOMContentLoadedイベントでモバイルメニューを初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
}