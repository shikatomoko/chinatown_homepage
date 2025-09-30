// 緑組詳細ポップアップのJavaScript

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
        detail.innerHTML = `
        <button class="close-btn" onclick="hideGroupDetail()">&times;</button>
        <h3>滲緑街の店舗</h3>
        <ul class="shop-list">
            <li><img src="../../shop_image/green/hospital/Hospital (Exterior).png" class="shop-icon" alt="病院"><a href="./shop_hospital.html">病院</a></li>
            <li><img src="../../shop_image/green/cakeshop/cakeshop.png" class="shop-icon" alt="ケーキ屋"><a href="./shop_cakeshop.html">ケーキ屋</a></li>
            <li><img src="../../shop_image/green/lab/lab_warehouse.jpg" class="shop-icon" alt="研究所"><a href="./shop_laboratory.html">研究所</a></li>
            <li><img src="../../shop_image/green/incense/Incense Shop (Exterior).png" class="shop-icon" alt="お香屋"><a href="./shop_incense.html">お香屋</a></li>
            <li><img src="../../shop_image/green/zoo/zoo.png" class="shop-icon" alt="動物園"><a href="./shop_zoo.html">動物園</a></li>
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