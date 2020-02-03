import * as browser from "webextension-polyfill";

const $ = selectors => Array.from(document.querySelectorAll(selectors));

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Content script received", message);
  // Handle the user registration event
  if (message.registered) {
    onRegisterSuccess(message);
  }
});

async function init() {
  let result = await browser.storage.sync.get(["registered"]);
  // Check if user is previously registered
  if (result.registered) {
    render();
  }
}

init();

async function onRegisterSuccess(message) {
  let result = await browser.storage.sync.set({
    registered: true
  });
  console.log("Set registered status", result);
  alert("Now you can use this extension!");
  // Do our business with the content
  render();
}

function render() {
  $("#firstHeading")[0].innerText =
    "This is an extension that I made over the weekend!";
}
