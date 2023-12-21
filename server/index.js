const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.post("/generate-pdf", async (req, res) => {
  // Extract data from the request
  const { channelName, channelDescription, numberOfVideos, playlistTitle, videosArray } = req.body;

  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set content and generate PDF
  const contentHTML = `
    <div>
      <div style="font-size: 18px; font-weight: bold;">Content script details:</div>
      <div>Channel Name: ${channelName}</div>
      <div>Channel Description: ${channelDescription}</div>
      <div>Number of Videos: ${numberOfVideos}</div>
      <div style="font-size: 16px; font-weight: bold;">Playlist Title: ${playlistTitle}</div>
      <div style="font-size: 16px; font-weight: bold;">All Videos:</div>
      ${videosArray.map((video, index) => `
        <div>Video ${index + 1}: ${video.videoTitle} - ${video.videoName}</div>
      `).join('')}
    </div>
  `;

  await page.setContent(contentHTML);
  const pdfBuffer = await page.pdf();

  // Close the browser
  await browser.close();

  // Send the PDF as a response
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=generated.pdf");
  res.send(pdfBuffer);
});

app.post("/", async (req, res) => {
	res.json("hello world");
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

