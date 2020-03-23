/* global chrome */

import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import { css } from "emotion";

async function getLocalStorageValue(key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, function(value) {
        resolve(value);
      });
    } catch (error) {
      reject(error);
    }
  });
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
  }

  componentDidMount() {
    const queryInfo = {
      url: "*://www.youtube.com/*"
    };

    chrome.tabs.query(queryInfo, result => {
      let arrayVideos = [];
      for (let i = 0; i < result.length; i++) {
        let url = result[i].url;
        console.log(url);
        chrome.tabs.executeScript(
          result[i].id,
          { code: 'document.querySelector("video").currentTime' },
          results => {
            const time = results && results[0];
            const minute = Math.round(time / 60);
            const second = Math.round(time % 60);
            arrayVideos.push({
              url: url,
              currentMin: minute,
              currentSec: second
            });

            this.setState({ videos: arrayVideos });

            const { videos } = this.state;

            chrome.storage.sync.set(
              { myKey: videos },
              console.log("Video array saved!")
            );
          }
        );
      }
    });

    getLocalStorageValue("myKey").then(result => {
      this.setState({ videos: result.myKey });
    });
  }

  render() {
    const { videos } = this.state;
    return (
      <div
        className={css`
          background: #e0eafc; /* fallback for old browsers */
          background: -webkit-linear-gradient(
            to left,
            #cfdef3,
            #e0eafc
          ); /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(
            to left,
            #cfdef3,
            #e0eafc
          ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

          color: black;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
          `}
        >
          <div
            className={css`
              margin: auto;
            `}
          >
            <img src="https://img.icons8.com/dusk/2x/youtube-play.png" />
          </div>
          <div
            className={css`
              margin: auto;
            `}
          >
            <h1
              className={css`
                font-family: "Open Sans";
              `}
            >
              Don't let your YouTube browsing history fade away
            </h1>
          </div>
        </div>
        <div
          className={css`
            display: flex;
            justify-content: center;
          `}
        >
          {videos ? (
            videos.map(object => {
              return (
                <ReactPlayer
                  url={`${object.url}&t=${object.currentMin}m${object.currentSec}s`}
                  className={css`
                  width: 20%;
                  margin: 1rem;
                  border: 3px solid #333333;
                  border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
                  }
                `}
                />
              );
            })
          ) : (
            <p>Something went wrong ¯\_(ツ)_/¯</p>
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
