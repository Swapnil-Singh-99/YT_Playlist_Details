chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: executeContentScript,
  });
});

function executeContentScript() {
  // Your content script logic goes here
  console.log("Content script executed!");
}
