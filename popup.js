document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logDetails").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "logDetails" });
    });
  });
});
