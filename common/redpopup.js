// 赤組詳細ポップアップのJavaScript

// パス検出のロジック（navigation.jsと同じシステム）
function detectLinkPrefix() {
    // 現在のパスを取得
    let currentPath = window.location.href || window.location.pathname || document.URL;
    
    let linkPrefix = '';
    
    // Method 1: URL内のフォルダ名から判定
    if (currentPath.includes('characterpage') || currentPath.includes('shoppage')) {
        // 2階層深い（例：shoppage/red/shop_nailsalon.html）
        linkPrefix = '../../';
    } else if (currentPath.includes('colorpage')) {
        // 1階層深い（例：colorpage/red.html）  
        linkPrefix = '../';
    } else {
        // Method 2: redpopup.jsファイルの相対位置から判定
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            if (script.src && script.src.includes('redpopup.js')) {
                const popupPath = script.getAttribute('src') || script.src;
                if (popupPath.includes('../../common/redpopup.js')) {
                    linkPrefix = '../../';
                    break;
                } else if (popupPath.includes('../common/redpopup.js')) {
                    linkPrefix = '../';
                    break;
                } else if (popupPath.includes('common/redpopup.js') && !popupPath.includes('../')) {
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

// 赤組店舗一覧HTMLを生成する関数
function createRedShopListHTML() {
    const linkPrefix = detectLinkPrefix();
    const currentPath = window.location.href || window.location.pathname || document.URL;
    
    // shoppage/red/内からの呼び出しかどうかを判定
    const isInShoppage = currentPath.includes('shoppage') && currentPath.includes('red');
    
    // shopページへのリンクパス
    const shopLinkPrefix = isInShoppage ? '' : linkPrefix + 'shoppage/red/';
    
    return `
        <button class="close-btn" onclick="hideGroupDetail()">&times;</button>
        <h3>呑紅街の店舗</h3>
        <ul class="shop-list">
            <li><img src="${linkPrefix}shop_image/red/nailsalon/nailsalon.png" class="shop-icon" alt="ネイルサロン"><a href="${shopLinkPrefix}shop_nailsalon.html">ネイルサロン</a></li>
            <li><img src="${linkPrefix}shop_image/red/tailor/tailor.png" class="shop-icon" alt="テーラー"><a href="${shopLinkPrefix}shop_tailor.html">テーラー</a></li>
            <li><img src="${linkPrefix}shop_image/red/antique/antique.png" class="shop-icon" alt="骨董楼"><a href="${shopLinkPrefix}shop_antique.html">骨董楼</a></li>
            <li><img src="${linkPrefix}shop_image/red/spa/spa.png" class="shop-icon" alt="湯治屋"><a href="${shopLinkPrefix}shop_spa.html">湯治屋</a></li>
            <li><img src="${linkPrefix}shop_image/red/informer/informer.png" class="shop-icon" alt="情報屋"><a href="${shopLinkPrefix}shop_informer.html">情報屋</a></li>
            <li><img src="${linkPrefix}shop_image/red/torture/torture.png" class="shop-icon" alt="拷問屋"><a href="${shopLinkPrefix}shop_torture.html">拷問屋</a></li>
            <li><img src="${linkPrefix}shop_image/red/tattoo/tattoo.png" class="shop-icon" alt="刺青屋"><a href="${shopLinkPrefix}shop_tattoo.html">刺青屋</a></li>
            <li><img src="${linkPrefix}shop_image/red/printing/printing.png" class="shop-icon" alt="印紙屋"><a href="${shopLinkPrefix}shop_stamp.html">印紙屋</a></li>
            <li><img src="${linkPrefix}shop_image/red/restaurant/restaurant.png" class="shop-icon" alt="レストラン"><a href="${shopLinkPrefix}shop_redrestaurant.html">レストラン</a></li>
        </ul>
    `;
}

function showRedGroupDetail() {
    hideGroupDetail();
    
    // 既存の要素をチェックし、なければ作成
    let overlay = document.getElementById('overlay');
    let detail = document.getElementById('detail-red');
    
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
        detail.id = 'detail-red';
        detail.innerHTML = createRedShopListHTML();
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

// 赤組ポップアップを初期化する関数
function initRedPopup() {
    // オーバーレイクリックで閉じるイベントを設定
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', hideGroupDetail);
    }
}

// 初期化処理（navigation.jsと同じパターン）
function initializeRedPopup() {
    // DOMContentLoadedイベントで初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRedPopup);
    } else {
        initRedPopup();
    }
}

// グローバル関数として公開
window.showRedGroupDetail = showRedGroupDetail;

// 初期化実行
initializeRedPopup();