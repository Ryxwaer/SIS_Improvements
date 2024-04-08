(function() {
    function hideOrShowElements(action) {
        chrome.storage.local.get(['elementsToHide'], function(result) {
            const elementsToHide = result.elementsToHide || [];
            elementsToHide.forEach(className => {
                document.querySelectorAll(`.${className}`).forEach(el => {
                    el.style.display = action === 'hide' && window.location.href.includes("/integrationflows/") ? 'none' : '';
                });
            });
        });
    }

    const observer = new MutationObserver(() => {
        hideOrShowElements('hide');
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initially try to hide elements
    hideOrShowElements('hide');
})();
