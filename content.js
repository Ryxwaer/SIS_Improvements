(function() {

    // First, attempt to revert any previous hiding for robustness
    const previouslyHidden = document.querySelectorAll('.sapTntToolPageAside');
    previouslyHidden.forEach(el => {
        el.style.display = ''; // Remove the display style to revert to default
    });

    // Function to hide elements, called directly and by the observer when needed
    function hideElements() {
        if (window.location.href.includes("/integrationflows/")) {
            const elementsToHide = document.querySelectorAll('.sapTntToolPageAside');
            elementsToHide.forEach(el => {
                el.style.display = 'none'; // Hide element
            });
            if (elementsToHide.length > 0) {
                console.log(`${elementsToHide.length} elements hidden.`);
                observer.disconnect();
            }
        }
    }

    // Observer to watch for DOM changes and apply hiding logic as needed
    const observer = new MutationObserver((mutations) => {
        hideElements();
    });

    // Start observing the document body for added nodes and subtree modifications
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial call to attempt to hide elements before observer kicks in
    hideElements();
})();
