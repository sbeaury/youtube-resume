/* global chrome */

import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";

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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="https://img.icons8.com/dusk/2x/resume-button.png" />
        </div>
        <div>
          {arrayVideos.map(object => {
            return (
              <ReactPlayer
                url={`${object.url}&t=${object.currentMin}m${object.currentSec}s`}
                width="30%"
              />
            );
          })}
        </div>
      </>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
