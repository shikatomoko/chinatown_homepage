// 青組詳細ポップアップのJavaScript

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
        detail.innerHTML = `
        <button class="close-btn" onclick="hideGroupDetail()">&times;</button>
        <h3>蒼殉街の店舗</h3>
        <ul class="shop-list">
            <li><img src="../../shop_image/blue/cult/Religious facility (altar).png" class="shop-icon" alt="教団本部"><a href="./shop_cult.html">教団本部</a></li>
            <li><img src="../../shop_image/blue/school/School (Classroom).png" class="shop-icon" alt="学校"><a href="./shop_school.html">学校</a></li>
            <li><img src="../../shop_image/blue/aquarium/Aquarium (Exterior).png" class="shop-icon" alt="水族館"><a href="./shop_aquarium.html">水族館</a></li>
            <li><img src="../../shop_image/blue/museum/museum.png" class="shop-icon" alt="博物館"><a href="./shop_museum.html">博物館</a></li>
            <li><img src="../../shop_image/blue/farm/Farm (Exterior).png" class="shop-icon" alt="畑"><a href="./shop_farm.html">畑</a></li>
            <li><img src="../../shop_image/blue/mine/mine.png" class="shop-icon" alt="鉱山"><a href="./shop_mine.html">鉱山</a></li>
        </ul>
        `;
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

window.showBlueGroupDetail = showBlueGroupDetail;