// 赤組詳細ポップアップ専用JavaScript - redpopup.js

/**
 * 赤組詳細ポップアップを表示する
 */
function showRedGroupDetail() {
    hideGroupDetail();
    
    const detail = document.getElementById('detail-red');
    const overlay = document.getElementById('overlay');
    
    if (detail && overlay) {
        detail.classList.add('active');
        overlay.classList.add('active');
        
        // ESCキーイベントを追加
        document.addEventListener('keydown', handleEscKey);
        
        // フォーカスをポップアップに移動（アクセシビリティ向上）
        detail.setAttribute('tabindex', '-1');
        detail.focus();
    }
}

/**
 * 赤組詳細ポップアップを非表示にする
 */
function hideGroupDetail() {
    const details = document.querySelectorAll('.group-detail');
    const overlay = document.getElementById('overlay');
    
    details.forEach(detail => {
        detail.classList.remove('active');
    });
    
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    // ESCキーイベントを削除
    document.removeEventListener('keydown', handleEscKey);
}

/**
 * ESCキーでポップアップを閉じる
 */
function handleEscKey(event) {
    if (event.key === 'Escape') {
        hideGroupDetail();
    }
}

/**
 * 赤組ポップアップのHTMLを動的に生成する
 */
function createRedPopupHTML() {
    // オーバーレイが存在しない場合は作成
    if (!document.getElementById('overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.id = 'overlay';
        document.body.appendChild(overlay);
    }
    
    // 赤組詳細ポップアップが存在しない場合は作成
    if (!document.getElementById('detail-red')) {
        const popupHTML = `
            <div class="group-detail" id="detail-red">
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
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }
}

/**
 * 赤組ポップアップ機能を初期化する
 */
function initRedPopup() {
    // HTML要素を動的に生成
    createRedPopupHTML();
    
    // オーバーレイクリックで閉じる
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', hideGroupDetail);
    }
    
    // 閉じるボタンのクリックイベント
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideGroupDetail);
    }
    
    // 赤組ボタンのクリックイベント
    const redGroupBtn = document.querySelector('.red-group-btn');
    if (redGroupBtn) {
        redGroupBtn.addEventListener('click', showRedGroupDetail);
    }
}

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', function() {
    initRedPopup();
});

// 外部から利用可能な関数をグローバルスコープに公開
window.showRedGroupDetail = showRedGroupDetail;
window.hideGroupDetail = hideGroupDetail;