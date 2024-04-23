(function() {
    let timeout;
    if (window && window.hasInjected) {
        return;
    }
    window.hasInjected = true;

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
        clearTimeout(timeout);
        timeout = setTimeout(() => hideOrShowElements('hide'), 100);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    hideOrShowElements('hide');
})();
