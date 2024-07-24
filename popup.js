document.addEventListener('DOMContentLoaded', function() {
    const defaultConfig = ["sapTntToolPageAside", "sapTntToolPageHeaderWrapper"];
    const toggleButton = document.getElementById('toggleButton');
    const toggleIcon = document.getElementById('toggleIcon');
    const elementsToToggle = [
        'sapTntToolPageAside',
        'sapTntToolPageHeaderWrapper'
    ];
  
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
    chrome.storage.local.get(['elementsToHide', 'themeChange', 'blockAuthPopups'], function(result) {
        if (result.elementsToHide === undefined) {
            // If there's no saved configuration, save the default one
            chrome.storage.local.set({elementsToHide: defaultConfig}, saveConfig);
        } else {
            // Set checkbox states based on saved configuration
            document.getElementById('sapTntToolPageAside').checked = result.elementsToHide.includes('sapTntToolPageAside');
            document.getElementById('sapTntToolPageHeaderWrapper').checked = result.elementsToHide.includes('sapTntToolPageHeaderWrapper');
        }
  
        // Set initial state of the icon based on themeChange
        const themeChange = result.themeChange || false;
        updateIcon(themeChange);
  
        // Set the state of the blockAuthPopups checkbox
        document.getElementById('blockAuthPopups').checked = result.blockAuthPopups || false;
    });
  
    // Add change event listeners to checkboxes to save configuration on change
    document.getElementById('sapTntToolPageAside').addEventListener('change', saveConfig);
    document.getElementById('sapTntToolPageHeaderWrapper').addEventListener('change', saveConfig);
  
    // Add click event listener to toggle button
    toggleButton.addEventListener('click', function() {
        chrome.storage.local.get(['themeChange'], function(result) {
            const themeChange = !result.themeChange;
            chrome.storage.local.set({themeChange: themeChange}, function() {
                updateIcon(themeChange);
            });
        });
    });
  
    // Add change event listener to the blockAuthPopups checkbox
    document.getElementById('blockAuthPopups').addEventListener('change', function() {
        const blockAuthPopups = document.getElementById('blockAuthPopups').checked;
        chrome.storage.local.set({blockAuthPopups: blockAuthPopups}, function() {
            console.log('Block Auth Popups setting saved:', blockAuthPopups);
        });
    });
  
    function updateIcon(themeChange) {
        toggleIcon.src = themeChange ? 'icons/eye_see_64.png' : 'icons/eye_blind_64.png';
    }
  });
  
  document.getElementById('removeButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['content.js']
        });
    });
  });
  