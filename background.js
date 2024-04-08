chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check for a completed navigation in a tab that matches your target URL
  if (changeInfo.status === 'complete' && tab.url.match(/https:\/\/.*\.hana\.ondemand.com\/shell\/design\/contentpackage\/.*/)) {
    // Inject the content script into the tab
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  }
});
