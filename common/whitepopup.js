// 詳細ポップアップ専用JavaScript - whitepopup.js

function getCorrectPath(relativePath) {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== '');
    
    // HTMLファイルを除いた階層数を計算
    const htmlFile = pathSegments[pathSegments.length - 1];
    const isHtmlFile = htmlFile && htmlFile.endsWith('.html');
    const depth = isHtmlFile ? pathSegments.length - 1 : pathSegments.length;
    
    // ルートからの相対パスを生成
    const prefix = depth > 0 ? '../'.repeat(depth) : './';
    return prefix + relativePath;
}

function showWhiteGroupDetail() {
    hideGroupDetail();
    
    // 既存の要素をチェックし、なければ作成
    let overlay = document.getElementById('overlay');
    let detail = document.getElementById('detail-white');
    
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
        detail.id = 'detail-white';
        detail.innerHTML = `
            <button class="close-btn" onclick="hideGroupDetail()">&times;</button>
            <h3>白葬街の店舗</h3>
            <ul class="shop-list">
            <li><img src="${getCorrectPath('shop_image/white/butcher/butcher.jpg')}" class="shop-icon" alt="肉屋"><a href="${getCorrectPath('white/shop_butcher.html')}">肉屋</a></li>
            <li><img src="${getCorrectPath('shop_image/white/leather/Leather Shop (Workshop).png')}" class="shop-icon" alt="皮屋"><a href="${getCorrectPath('white/shop_leather.html')}">皮屋</a></li>
            <li><img src="${getCorrectPath('shop_image/white/undertaker/Undertaker Shop (Exterior).png')}" class="shop-icon" alt="葬儀屋"><a href="${getCorrectPath('white/shop_undertaker.html')}">葬儀屋</a></li>
            </ul>
        `;
        document.body.appendChild(detail);
        // ×ボタンに閉じるイベントを追加
        const closeBtn = detail.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', hideGroupDetail);
        }
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

/**
 * DOMContentLoaded時の初期化
 */
document.addEventListener('DOMContentLoaded', function() {
    // オーバーレイクリックで閉じる
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', hideGroupDetail);
    }
});

window.showWhiteGroupDetail = showWhiteGroupDetail;