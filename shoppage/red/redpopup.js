// 赤組詳細ポップアップ専用JavaScript - redpopup.js

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
        detail.innerHTML = `
                <button class="close-btn">&times;</button>
                <h3>呑紅街の店舗</h3>
                <ul class="shop-list">
                    <li><img src="../../shop_image/red/nailsalon/nailsalon.png" class="shop-icon" alt="ネイルサロン"><a href="./shop_nailsalon.html">ネイルサロン</a></li>
                    <li><img src="../../shop_image/red/tailor/tailor.png" class="shop-icon" alt="テーラー"><a href="./shop_tailor.html">テーラー</a></li>
                    <li><img src="../../shop_image/red/antique/antique.png" class="shop-icon" alt="骨董楼"><a href="./shop_antique.html">骨董楼</a></li>
                    <li><img src="../../shop_image/red/spa/spa.png" class="shop-icon" alt="湯治屋"><a href="./shop_spa.html">湯治屋</a></li>
                    <li><img src="../../shop_image/red/informer/informer.png" class="shop-icon" alt="情報屋"><a href="./shop_informer.html">情報屋</a></li>
                    <li><img src="../../shop_image/red/torture/torture.png" class="shop-icon" alt="拷問屋"><a href="./shop_torture.html">拷問屋</a></li>
                    <li><img src="../../shop_image/red/tattoo/tattoo.png" class="shop-icon" alt="刺青屋"><a href="./shop_tattoo.html">刺青屋</a></li>
                    <li><img src="../../shop_image/red/printing/printing.png" class="shop-icon" alt="印紙屋"><a href="./shop_stamp.html">印紙屋</a></li>
                    <li><img src="../../shop_image/red/restaurant/restaurant.png" class="shop-icon" alt="レストラン"><a href="./shop_redrestaurant.html">レストラン</a></li>
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