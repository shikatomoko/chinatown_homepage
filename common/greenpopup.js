// 緑組詳細ポップアップのJavaScript

// パス検出のロジック（navigation.jsと同じシステム）
function detectLinkPrefix() {
    // 現在のパスを取得
    let currentPath = window.location.href || window.location.pathname || document.URL;
    
    let linkPrefix = '';
    
    // Method 1: URL内のフォルダ名から判定
    if (currentPath.includes('characterpage') || currentPath.includes('shoppage')) {
        // 2階層深い（例：shoppage/green/shop_hospital.html）
        linkPrefix = '../../';
    } else if (currentPath.includes('colorpage')) {
        // 1階層深い（例：colorpage/green.html）  
        linkPrefix = '../';
    } else {
        // Method 2: greenpopup.jsファイルの相対位置から判定
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            if (script.src && script.src.includes('greenpopup.js')) {
                const popupPath = script.getAttribute('src') || script.src;
                if (popupPath.includes('../../common/greenpopup.js')) {
                    linkPrefix = '../../';
                    break;
                } else if (popupPath.includes('../common/greenpopup.js')) {
                    linkPrefix = '../';
                    break;
                } else if (popupPath.includes('common/greenpopup.js') && !popupPath.includes('../')) {
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

// 緑組店舗一覧HTMLを生成する関数
function createGreenShopListHTML() {
    const linkPrefix = detectLinkPrefix();
    const currentPath = window.location.href || window.location.pathname || document.URL;
    
    // shoppage/green/内からの呼び出しかどうかを判定
    const isInShoppage = currentPath.includes('shoppage') && currentPath.includes('green');
    
    // shopページへのリンクパス
    const shopLinkPrefix = isInShoppage ? '' : linkPrefix + 'shoppage/green/';
    
    return `
        <button class="close-btn" onclick="hideGroupDetail()">&times;</button>
        <h3>滲緑街の店舗</h3>
        <ul class="shop-list">
            <li><img src="${linkPrefix}shop_image/green/hospital/Hospital (Exterior).png" class="shop-icon" alt="病院"><a href="${shopLinkPrefix}shop_hospital.html">病院</a></li>
            <li><img src="${linkPrefix}shop_image/green/cakeshop/cakeshop.png" class="shop-icon" alt="ケーキ屋"><a href="${shopLinkPrefix}shop_cakeshop.html">ケーキ屋</a></li>
            <li><img src="${linkPrefix}shop_image/green/lab/lab_warehouse.jpg" class="shop-icon" alt="研究所"><a href="${shopLinkPrefix}shop_laboratory.html">研究所</a></li>
            <li><img src="${linkPrefix}shop_image/green/incense/Incense Shop (Exterior).png" class="shop-icon" alt="お香屋"><a href="${shopLinkPrefix}shop_incense.html">お香屋</a></li>
            <li><img src="${linkPrefix}shop_image/green/medicine/medicine.png" class="shop-icon" alt="動物園"><a href="${shopLinkPrefix}shop_zoo.html">動物園</a></li>
        </ul>
    `;
}

function showGreenGroupDetail() {
    hideGroupDetail();
    
    // 既存の要素をチェックし、なければ作成
    let overlay = document.getElementById('overlay');
    let detail = document.getElementById('detail-green');
    
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
        detail.id = 'detail-green';
        detail.innerHTML = createGreenShopListHTML();
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

// 緑組ポップアップを初期化する関数
function initGreenPopup() {
    // オーバーレイクリックで閉じるイベントを設定
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', hideGroupDetail);
    }
}

// 初期化処理（navigation.jsと同じパターン）
function initializeGreenPopup() {
    // DOMContentLoadedイベントで初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGreenPopup);
    } else {
        initGreenPopup();
    }
}

// グローバル関数として公開
window.showGreenGroupDetail = showGreenGroupDetail;

// 初期化実行
initializeGreenPopup();