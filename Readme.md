# YoutubeDigest

YouTubeDigest is a Chrome extension developed with webpack, React, TypeScript, and Puppeteer. It allows users to download playlists from YouTube into a PDF format for offline viewing or archiving.

## Key Features

- **Real-time Playlist Processing:** Experience seamless processing of YouTube playlists in real-time, ensuring efficient download of videos into a PDF format.
- **Intuitive User Interface:** Navigate through the extension effortlessly with a user-friendly interface designed to enhance the user experience.
- **Customization Options:** Personalize your download preferences with customizable settings, allowing you to tailor the PDF output according to your needs.
- **Offline Viewing:** Download playlists into a PDF format for offline viewing, enabling access to your favorite content anytime, anywhere.

## Video

`To be added`

## Screenshots

![image.png](https://i.postimg.cc/HsGKc3g6/image.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/hereisSwapnil/YoutubeDigest.git
```

Go to the server

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
 npm run dev
```

Go to the client

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Build the extension

```bash
 npm run build
```

### Follow the steps below:

1. Go to the chrome-specific url: chrome://extensions
2. Make sure developer mode is enabled. If not, you can switch it on using the "slider" at the top right corner.
3. Once developer mode is confirmed to be on, you can press "load more." This will open a file selector. You can then navigate to the `dist` inside `client` folder.
4. Once done, it should be enabled as well as working.
5. You are all good to go!

## License

[MIT](https://choosealicense.com/licenses/mit/)
