// chrome.action.onClicked.addListener(function (tab) {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: executeContentScript,
//   });
// });

// function executeContentScript() {
//   // Your content script logic goes here
//   console.log("Content script executed!");
// }

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "sendData") {
    // Access the data sent from content.js
    const receivedData = request.data;
    console.log(receivedData);
    // const response = await fetch("http://localhost:3000/generate-pdf", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(receivedData),
    // });

    // if (!response.ok) {
    //   console.error("Failed to fetch. HTTP status:", response.status);
    // } else {
    //   const blob = await response.blob();

    //   // Create a link element and trigger the download
    //   const link = document.createElement("a");
    //   link.href = URL.createObjectURL(blob);
    //   link.download = "generated.pdf";
    //   link.click();
    //   // Perform actions with the received data
    //   console.log("Received data in background script:", receivedData);

    //   // Send a response back to the content script if needed
    //   sendResponse({ status: "Data received successfully" });
    // }
  }
});
