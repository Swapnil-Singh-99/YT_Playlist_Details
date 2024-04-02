import React from "react";
import "./popup.css";

const PlaylistLogger = () => {
  const handleLogDetails = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "logDetails" },
        (response) => {
          console.log("Received data from content script:", response);
          generateAndDownloadPDF(response);
          // Do something with the data, e.g., update the component state
        }
      );
    });
  };

  const generateAndDownloadPDF = (data) => {
    console.log(data);
    fetch("https://youtubedigest.onrender.com/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then((pdfBlob) => {
        // Create a link element and trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download = "generated.pdf";
        link.click();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error occurred during PDF generation. Please try again.");
      });
  };

  return (
    <div id="popup-container">
      <div className="head">
        <img src="YD_logo.png" alt="" />
        <h1>Youtube Digest</h1>
      </div>
      <button id="logDetails" onClick={handleLogDetails}>
        <img className="download_img" src="download.png" alt="" /> Download PDF
      </button>
    </div>
  );
};

export default PlaylistLogger;
