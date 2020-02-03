import * as browser from "webextension-polyfill";

// Listen to messages sent from other parts of the extension.
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  let isResponseAsync = false;

  if (message.popupMounted) {
    console.log("background notified that Popup.tsx has mounted.");
  }

  if (message.registered) {
    console.log("registered");
    sendMessage(message);
  }

  return isResponseAsync;
});

// Forward message to content script
function sendMessage(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {});
  });
}
