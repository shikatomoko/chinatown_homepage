// 黄組詳細ポップアップのJavaScript

// パス検出のロジック（navigation.jsと同じシステム）
function detectLinkPrefix() {
    // 現在のパスを取得
    let currentPath = window.location.href || window.location.pathname || document.URL;
    
    let linkPrefix = '';
    
    // Method 1: URL内のフォルダ名から判定
    if (currentPath.includes('characterpage') || currentPath.includes('shoppage')) {
        // 2階層深い（例：shoppage/yellow/shop_casino.html）
        linkPrefix = '../../';
    } else if (currentPath.includes('colorpage')) {
        // 1階層深い（例：colorpage/yellow.html）  
        linkPrefix = '../';
    } else {
        // Method 2: yellowpopup.jsファイルの相対位置から判定
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            if (script.src && script.src.includes('yellowpopup.js')) {
                const popupPath = script.getAttribute('src') || script.src;
                if (popupPath.includes('../../common/yellowpopup.js')) {
                    linkPrefix = '../../';
                    break;
                } else if (popupPath.includes('../common/yellowpopup.js')) {
                    linkPrefix = '../';
                    break;
                } else if (popupPath.includes('common/yellowpopup.js') && !popupPath.includes('../')) {
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

// 黄組店舗一覧HTMLを生成する関数
function createYellowShopListHTML() {
    const linkPrefix = detectLinkPrefix();
    const currentPath = window.location.href || window.location.pathname || document.URL;
    
    // shoppage/yellow/内からの呼び出しかどうかを判定
    const isInShoppage = currentPath.includes('shoppage') && currentPath.includes('yellow');
    
    // shopページへのリンクパス
    const shopLinkPrefix = isInShoppage ? '' : linkPrefix + 'shoppage/yellow/';
    
    return `
        <button class="close-btn" onclick="hideGroupDetail()">&times;</button>
        <h3>黄惑街の店舗</h3>
        <ul class="shop-list">
            <li><img src="${linkPrefix}shop_image/yellow/casino/casino.png" class="shop-icon" alt="カジノ"><a href="${shopLinkPrefix}shop_casino.html">カジノ</a></li>
            <li><img src="${linkPrefix}shop_image/yellow/auction/auction_stage.png" class="shop-icon" alt="オークション"><a href="${shopLinkPrefix}shop_auction.html">オークション</a></li>
            <li><img src="${linkPrefix}shop_image/yellow/bank/bank_entrance.png" class="shop-icon" alt="銀行"><a href="${shopLinkPrefix}shop_bank.html">銀行</a></li>
            <li><img src="${linkPrefix}shop_image/yellow/brothel/brothel.png" class="shop-icon" alt="娼館"><a href="${shopLinkPrefix}shop_brothel.html">娼館</a></li>
            <li><img src="${linkPrefix}shop_image/yellow/courier/courier.png" class="shop-icon" alt="運び屋"><a href="${shopLinkPrefix}shop_courier.html">運び屋</a></li>
            <li><img src="${linkPrefix}shop_image/yellow/hostclub/hostclub.png" class="shop-icon" alt="ホストクラブ"><a href="${shopLinkPrefix}shop_hostclub.html">ホストクラブ</a></li>
            <li><img src="${linkPrefix}shop_image/yellow/hotel/hotel.png" class="shop-icon" alt="ホテル"><a href="${shopLinkPrefix}shop_hotel.html">ホテル</a></li>
            <li><img src="${linkPrefix}shop_image/yellow/park/park.jpg" class="shop-icon" alt="遊園地"><a href="${shopLinkPrefix}shop_park.html">遊園地</a></li>
            <li><img src="${linkPrefix}shop_image/yellow/trade/trade.png" class="shop-icon" alt="両替屋"><a href="${shopLinkPrefix}shop_trade.html">両替屋</a></li>
            <li><img src="${linkPrefix}shop_image/yellow/cosmeticsurgery/cosmetic_surgery.png" class="shop-icon" alt="美容整形外科"><a href="${shopLinkPrefix}shop_cosmeticsurgery.html">美容整形外科</a></li>
        </ul>
    `;
}

function showYellowGroupDetail() {
    hideGroupDetail();
    
    // 既存の要素をチェックし、なければ作成
    let overlay = document.getElementById('overlay');
    let detail = document.getElementById('detail-yellow');
    
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
        detail.id = 'detail-yellow';
        detail.innerHTML = createYellowShopListHTML();
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

// 黄組ポップアップを初期化する関数
function initYellowPopup() {
    // オーバーレイクリックで閉じるイベントを設定
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', hideGroupDetail);
    }
}

// 初期化処理（navigation.jsと同じパターン）
function initializeYellowPopup() {
    // DOMContentLoadedイベントで初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initYellowPopup);
    } else {
        initYellowPopup();
    }
}

// グローバル関数として公開
window.showYellowGroupDetail = showYellowGroupDetail;

// 初期化実行
initializeYellowPopup();