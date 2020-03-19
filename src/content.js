/* global chrome */

import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import { css } from "emotion";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayVideos: [],
      url: "",
      currentMin: 0,
      currentSec: 0
    };
  }

  componentDidMount() {
    const queryInfo = {
      url: "*://www.youtube.com/*"
    };

    chrome.tabs.query(queryInfo, result => {
      let arrayVideosCopy = [];
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
            arrayVideosCopy.push({
              url: url,
              currentMin: minute,
              currentSec: second
            });
            this.setState({ arrayVideos: arrayVideosCopy });
            console.log(this.state.arrayVideos);
          }
        );
      }
    });
  }

  render() {
    const { arrayVideos } = this.state;
    return (
      <>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
          `}
        >
          <div
          className={css`
            margin:auto;
          `}>
            <img src="https://img.icons8.com/dusk/2x/youtube-play.png" />
          </div>
          <div className={css`
            margin:auto;
          `}>
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
          {arrayVideos.map(object => {
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
          })}
        </div>
      </>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
