document.addEventListener('DOMContentLoaded', function() {
    const defaultConfig = ["sapTntToolPageAside", "sapTntToolPageHeaderWrapper"];

    // Function to save the current configuration
    function saveConfig() {
        const elementsToHide = [];
        if (document.getElementById('sapTntToolPageAside').checked) {
            elementsToHide.push('sapTntToolPageAside');
        }
        if (document.getElementById('sapTntToolPageHeaderWrapper').checked) {
            elementsToHide.push('sapTntToolPageHeaderWrapper');
        }
        chrome.storage.local.set({elementsToHide}, function() {
            console.log('Configuration saved');
        });
    }

    // Initialize the configuration or load existing settings
    chrome.storage.local.get(['elementsToHide'], function(result) {
        if (result.elementsToHide === undefined) {
            // If there's no saved configuration, save the default one
            chrome.storage.local.set({elementsToHide: defaultConfig}, saveConfig);
        } else {
            // Set checkbox states based on saved configuration
            document.getElementById('sapTntToolPageAside').checked = result.elementsToHide.includes('sapTntToolPageAside');
            document.getElementById('sapTntToolPageHeaderWrapper').checked = result.elementsToHide.includes('sapTntToolPageHeaderWrapper');
        }
    });

    // Add change event listeners to checkboxes to save configuration on change
    document.getElementById('sapTntToolPageAside').addEventListener('change', saveConfig);
    document.getElementById('sapTntToolPageHeaderWrapper').addEventListener('change', saveConfig);
});

document.getElementById('removeButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['content.js']
        });
    });
});