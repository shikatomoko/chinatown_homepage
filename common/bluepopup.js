// 青組詳細ポップアップのJavaScript

// パス検出のロジック（navigation.jsと同じシステム）
function detectLinkPrefix() {
    // 現在のパスを取得
    let currentPath = window.location.href || window.location.pathname || document.URL;
    
    let linkPrefix = '';
    
    // Method 1: URL内のフォルダ名から判定
    if (currentPath.includes('characterpage') || currentPath.includes('shoppage')) {
        // 2階層深い（例：shoppage/blue/shop_cult.html）
        linkPrefix = '../../';
    } else if (currentPath.includes('colorpage')) {
        // 1階層深い（例：colorpage/blue.html）  
        linkPrefix = '../';
    } else {
        // Method 2: bluepopup.jsファイルの相対位置から判定
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            if (script.src && script.src.includes('bluepopup.js')) {
                const popupPath = script.getAttribute('src') || script.src;
                if (popupPath.includes('../../common/bluepopup.js')) {
                    linkPrefix = '../../';
                    break;
                } else if (popupPath.includes('../common/bluepopup.js')) {
                    linkPrefix = '../';
                    break;
                } else if (popupPath.includes('common/bluepopup.js') && !popupPath.includes('../')) {
                    linkPrefix = '';
                    break;
                }
            }
        }
        
        // Method 3: HTMLファイル内のCSSリンクから判定（フォールバック）
        if (!linkPrefix) {
            const links = document.getElementsByTagName('link');
            for (let link of links) {
                if (link.href && (link.href.includes('styles.css') || link.href.includes('navigation.css'))) {
                    const cssPath = link.getAttribute('href') || link.href;
                    if (cssPath.includes('../../common/')) {
                        linkPrefix = '../../';
                        break;
                    } else if (cssPath.includes('../common/')) {
                        linkPrefix = '../';
                        break;
                    } else if (cssPath.includes('common/')) {
                        linkPrefix = '';
                        break;
                    }
                }
            }
        }
    }

    return linkPrefix;
}

// 青組店舗一覧HTMLを生成する関数
function createBlueShopListHTML() {
    const linkPrefix = detectLinkPrefix();
    const currentPath = window.location.href || window.location.pathname || document.URL;
    
    // shoppage/blue/内からの呼び出しかどうかを判定
    const isInShoppage = currentPath.includes('shoppage') && currentPath.includes('blue');
    
    // shopページへのリンクパス
    const shopLinkPrefix = isInShoppage ? '' : linkPrefix + 'shoppage/blue/';
    
    return `
        <button class="close-btn" onclick="hideGroupDetail()">&times;</button>
        <h3>蒼殉街の店舗</h3>
        <ul class="shop-list">
            <li><img src="${linkPrefix}shop_image/blue/cult/Religious facility (altar).png" class="shop-icon" alt="教団本部"><a href="${shopLinkPrefix}shop_cult.html">教団本部</a></li>
            <li><img src="${linkPrefix}shop_image/blue/school/School (Classroom).png" class="shop-icon" alt="学校"><a href="${shopLinkPrefix}shop_school.html">学校</a></li>
            <li><img src="${linkPrefix}shop_image/blue/aquarium/Aquarium (Exterior).png" class="shop-icon" alt="水族館"><a href="${shopLinkPrefix}shop_aquarium.html">水族館</a></li>
            <li><img src="${linkPrefix}shop_image/blue/museum/museum.png" class="shop-icon" alt="博物館"><a href="${shopLinkPrefix}shop_museum.html">博物館</a></li>
            <li><img src="${linkPrefix}shop_image/blue/farm/Farm (Exterior).png" class="shop-icon" alt="畑"><a href="${shopLinkPrefix}shop_farm.html">畑</a></li>
            <li><img src="${linkPrefix}shop_image/blue/mine/mine.png" class="shop-icon" alt="鉱山"><a href="${shopLinkPrefix}shop_mine.html">鉱山</a></li>
        </ul>
    `;
}
function showBlueGroupDetail() {
    hideGroupDetail();
    
    // 既存の要素をチェックし、なければ作成
    let overlay = document.getElementById('overlay');
    let detail = document.getElementById('detail-blue');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.id = 'overlay';
        overlay.addEventListener('click', hideGroupDetail);
        document.body.appendChild(overlay);
    }
    
    if (!detail) {
        detail = document.createElement('div');
        detail.className = 'group-detail';
        detail.id = 'detail-blue';
        detail.innerHTML = createBlueShopListHTML();
        document.body.appendChild(detail);
    }
    
    if (detail && overlay) {
        detail.classList.add('active');
        overlay.classList.add('active');
        
        document.addEventListener('keydown', handleEscKey);
    }
}

/**
 * ポップアップを非表示
 */
function hideGroupDetail() {
    const detail = document.querySelector('.group-detail.active');
    const overlay = document.getElementById('overlay');
    
    if (detail) {
        detail.classList.remove('active');
    }
    
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    document.removeEventListener('keydown', handleEscKey);
}

/**
 * ESCキーでポップアップを閉じる処理
 * @param {KeyboardEvent} event - キーボードイベント
 */
function handleEscKey(event) {
    if (event.key === 'Escape') {
        hideGroupDetail();
    }
}

// 青組ポップアップを初期化する関数
function initBluePopup() {
    // オーバーレイクリックで閉じるイベントを設定
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', hideGroupDetail);
    }
}

// 初期化処理（navigation.jsと同じパターン）
function initializeBluePopup() {
    // DOMContentLoadedイベントで初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBluePopup);
    } else {
        initBluePopup();
    }
}

// グローバル関数として公開
window.showBlueGroupDetail = showBlueGroupDetail;

// 初期化実行
initializeBluePopup();