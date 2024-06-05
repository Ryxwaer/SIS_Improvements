(function() {
    
    let timeout;
    if (window && window.hasInjected) {
        return;
    }
    window.hasInjected = true;

    function hideOrShowElements(action) {
        chrome.storage.local.get(['elementsToHide'], function(result) {
            if (chrome.runtime.lastError) {
                console.error('Error fetching elementsToHide:', chrome.runtime.lastError);
                return;
            }

            const elementsToHide = result.elementsToHide || [];
            elementsToHide.forEach(className => {
                document.querySelectorAll(`.${className}`).forEach(el => {
                    el.style.display = action === 'hide' && window.location.href.includes("/integrationflows/") ? 'none' : '';
                });
            });
            console.log("SIS_Improvements: Elements hidden");
        });

        // Theme changer for scripts
        chrome.storage.local.get(['themeChange'], function(result) {
            if (chrome.runtime.lastError) {
                console.error('Error fetching themeChange:', chrome.runtime.lastError);
                return;
            }

            if (window.location.href.includes("/script/")) {
                const themeChange = result.themeChange || false;
                if (themeChange) {
                    document.querySelectorAll('div[id$="--scriptTextArea-editor"]').forEach(el => {
                        el.classList.replace('ace-tomorrow', 'ace-tm');
                    });
                    console.log("SIS_Improvements: Theme changed");
                }
            }
        });
    }

    const observer = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => hideOrShowElements('hide'), 100);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    hideOrShowElements('hide');
})();
