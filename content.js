chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "logDetails") {
    console.log("Content script received logDetails message!");
    console.log("Content script loaded!");

    function getChannelDetails() {
      const channelNameElement = document.querySelector(
        "yt-formatted-string.ytd-channel-name"
      );
      const channelName = channelNameElement
        ? channelNameElement.innerText
        : "";

      const descriptionElement = document.querySelector("#plain-snippet-text");
      const channelDescription = descriptionElement
        ? descriptionElement.innerText
        : "";

      const numberOfVideos = document.querySelectorAll(
        "ytd-playlist-video-renderer"
      ).length;

      return { channelName, channelDescription, numberOfVideos };
    }

    function getVideoDetails(videoElement) {
      const videoTitle = videoElement.querySelector(
        "yt-formatted-string"
      ).innerText;
      const videoName = videoElement
        .querySelector("a.yt-simple-endpoint")
        .getAttribute("title");

      return { videoTitle, videoName };
    }

    const { channelName, channelDescription, numberOfVideos } =
      getChannelDetails();
    console.log("Channel Name:", channelName);
    console.log("Channel Description:", channelDescription);
    console.log("Number of Videos:", numberOfVideos);

    const playlistTitle = document.title;
    console.log("Playlist Title:", playlistTitle);

    const videosArray = [];
    document
      .querySelectorAll(".ytd-playlist-video-renderer #meta")
      .forEach((videoElement, index) => {
        const { videoTitle, videoName } = getVideoDetails(videoElement);
        console.log(`Video ${index + 1}: ${videoTitle} - ${videoName}`);
        videosArray.push({ videoTitle, videoName });
      });

    console.log("All Videos:", videosArray);
    console.log("Details logged from content script!");
    generateAndDownloadPDF(
      channelName,
      channelDescription,
      numberOfVideos,
      playlistTitle,
      videosArray
    );
  }
});

function generateAndDownloadPDF(
  channelName,
  channelDescription,
  numberOfVideos,
  playlistTitle,
  videosArray
) {
  const docDefinition = {
    content: [
      { text: "Content script details:", style: "header" },
      { text: "Channel Name: " + channelName },
      { text: "Channel Description: " + channelDescription },
      { text: "Number of Videos: " + numberOfVideos },
      { text: "Playlist Title: " + playlistTitle, style: "subheader" },
      { text: "All Videos:", style: "subheader" },
      ...videosArray.map((video, index) => {
        return {
          text: `Video ${index + 1}: ${video.videoTitle} - ${video.videoName}`,
        };
      }),
    ],
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 16, bold: true },
    },
  };

  pdfMake.createPdf(docDefinition).download("content_script_details.pdf");
}
