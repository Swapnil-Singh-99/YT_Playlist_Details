chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "logDetails") {
    function getChannelDetails() {
      const channelNameElement = document.querySelector<HTMLElement>(
        "yt-formatted-string.ytd-channel-name"
      );
      const channelName = channelNameElement
        ? channelNameElement.innerText
        : "";

      const descriptionElement = document.querySelector<HTMLElement>(
        "#plain-snippet-text"
      );
      const channelDescription = descriptionElement
        ? descriptionElement.innerText
        : "";

      const numberOfVideos = document.querySelectorAll<HTMLElement>(
        "ytd-playlist-video-renderer"
      ).length;

      return { channelName, channelDescription, numberOfVideos };
    }

    function getVideoDetails(videoElement: HTMLElement) {
      const videoTitleElement = videoElement.querySelector<HTMLElement>(
        "yt-formatted-string"
      );
      const videoTitle = videoTitleElement?.innerText || "";

      const videoNameElement = videoElement.querySelector<HTMLAnchorElement>(
        "a.yt-simple-endpoint"
      );
      const videoName = videoNameElement?.getAttribute("title") || "";

      return { videoTitle, videoName };
    }

    const { channelName, channelDescription, numberOfVideos } =
      getChannelDetails();

    const playlistTitle = document.title;

    const videosArray: { videoTitle: string; videoName: string }[] = [];
    document
      .querySelectorAll<HTMLElement>(".ytd-playlist-video-renderer #meta")
      .forEach((videoElement, index) => {
        const { videoTitle, videoName } = getVideoDetails(videoElement);
        videosArray.push({ videoTitle, videoName });
      });
    const data = {
      channelName,
      channelDescription,
      numberOfVideos,
      playlistTitle,
      videosArray,
    };
    sendResponse(data);
  }
});
