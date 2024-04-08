chrome.runtime.onInstalled.addListener((details) => {
  const defaultConfig = ["sapTntToolPageAside", "sapTntToolPageHeaderWrapper"];

  // Check if the extension was just installed or updated
  if (details.reason === "install" || details.reason === "update") {
      // Save the default configuration to storage
      chrome.storage.local.set({elementsToHide: defaultConfig}, () => {
          console.log("Default configuration saved.");
      });
  }
});
