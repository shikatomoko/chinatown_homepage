// 青組詳細ポップアップのJavaScript

function showBlueGroupDetail() {
    hideGroupDetail();
    
    const detail = document.getElementById('detail-blue');
    const overlay = document.getElementById('overlay');
    
    if (detail && overlay) {
        detail.classList.add('active');
        overlay.classList.add('active');
        
        document.addEventListener('keydown', handleEscKey);
    }
}

function hideGroupDetail() {
    const details = document.querySelectorAll('.group-detail');
    const overlay = document.getElementById('overlay');
    
    details.forEach(detail => {
        detail.classList.remove('active');
    });
    
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    document.removeEventListener('keydown', handleEscKey);
}

function handleEscKey(event) {
    if (event.key === 'Escape') {
        hideGroupDetail();
    }
}

// オーバーレイクリックで閉じる
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', hideGroupDetail);
    }
    
    // ポップアップ内のクリックでは閉じない
    const groupDetails = document.querySelectorAll('.group-detail');
    groupDetails.forEach(detail => {
        detail.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
});