(function() {
    // First, attempt to revert any previous hiding for robustness
    const previouslyHidden = document.querySelectorAll('.sapTntToolPageAside');
    previouslyHidden.forEach(el => {
        el.style.display = ''; // Remove the display style to revert to default
    });

    // Check if the current page matches your specific criteria
    if (window.location.href.includes("/integrationflows/")) {
        const elementsToHide = document.querySelectorAll('.sapTntToolPageAside');
        elementsToHide.forEach(el => {
            el.style.display = 'none'; // Hide element
        });
        if (elementsToHide.length > 0) {
            console.log(`${elementsToHide.length} elements hidden.`);
        }
    }
})();
