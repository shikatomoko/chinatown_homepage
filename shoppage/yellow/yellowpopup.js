/**
 * 黄惑街店舗ポップアップ機能
 */

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
        detail.innerHTML = `
            <button class="close-btn" onclick="hideGroupDetail()">&times;</button>
            <h3>黄惑街の店舗</h3>
            <ul class="shop-list">
                <li><img src="../../shop_image/yellow/casino/casino.png" class="shop-icon" alt="カジノ"><a href="./shop_casino.html">カジノ</a></li>
                <li><img src="../../shop_image/yellow/auction/auction_stage.png" class="shop-icon" alt="オークション"><a href="./shop_auction.html">オークション</a></li>
                <li><img src="../../shop_image/yellow/bank/bank_entrance.png" class="shop-icon" alt="銀行"><a href="./shop_bank.html">銀行</a></li>
                <li><img src="../../shop_image/yellow/brothel/brothel.png" class="shop-icon" alt="娼館"><a href="./shop_brothel.html">娼館</a></li>
                <li><img src="../../shop_image/yellow/courier/courier.png" class="shop-icon" alt="運び屋"><a href="./shop_courier.html">運び屋</a></li>
                <li><img src="../../shop_image/yellow/hostclub/hostclub.png" class="shop-icon" alt="ホストクラブ"><a href="./shop_hostclub.html">ホストクラブ</a></li>
                <li><img src="../../shop_image/yellow/hotel/hotel.png" class="shop-icon" alt="ホテル"><a href="./shop_hotel.html">ホテル</a></li>
                <li><img src="../../shop_image/yellow/park/park.jpg" class="shop-icon" alt="遊園地"><a href="./shop_park.html">遊園地</a></li>
                <li><img src="../../shop_image/yellow/trade/trade.png" class="shop-icon" alt="両替屋"><a href="./shop_trade.html">両替屋</a></li>
                <li><img src="../../shop_image/yellow/cosmeticsurgery/cosmetic_surgery.png" class="shop-icon" alt="美容整形外科"><a href="./shop_cosmeticsurgery.html">美容整形外科</a></li>
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