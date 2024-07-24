chrome.runtime.onInstalled.addListener((details) => {
  const defaultConfig = ["sapTntToolPageAside", "sapTntToolPageHeaderWrapper"];

  // Check if the extension was just installed or updated
  if (details.reason === "install" || details.reason === "update") {
    // Save the default configuration to storage
    chrome.storage.local.set({ elementsToHide: defaultConfig }, () => {
      console.log("Default configuration saved.");
    });
    chrome.storage.local.set({ themeChange: true }, () => {
      console.log("Default themeChange saved.");
    });
    chrome.storage.local.set({ blockAuthPopups: true }, () => {
      console.log("Default blockAuthPopups saved.");
    });
  }

  // Initialize the auth listener based on the current setting
  chrome.storage.local.get('blockAuthPopups', (result) => {
    updateAuthListener(result.blockAuthPopups);
  });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.blockAuthPopups) {
    const blockAuthPopups = changes.blockAuthPopups.newValue;
    updateAuthListener(blockAuthPopups);
  }
});

function updateAuthListener(enable) {
  chrome.webRequest.onAuthRequired.removeListener(handleAuthRequest);

  if (enable) {
    chrome.webRequest.onAuthRequired.addListener(
      handleAuthRequest,
      { urls: ["https://*.hana.ondemand.com/*"] },
      ["blocking"]
    );
  }
}

function handleAuthRequest(details) {
  return { cancel: true };
}
