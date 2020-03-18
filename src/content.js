/* global chrome */

import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMin: 0,
      currentSec: 0,
      url: ""
    };
  }

  componentDidMount() {
    const queryInfo = {
      url: "*://www.youtube.com/*"
    };

    chrome.tabs.query(queryInfo, result => {
      for (let i = 0; i < result.length; i++) {
        this.setState({ url: result[i].url });
        chrome.tabs.executeScript(
          result[i].id,
          { code: 'document.querySelector("video").currentTime' },
          results => {
            const time = results && results[0];
            const minute = Math.round(time / 60);
            const second = Math.round(time % 60);
            this.setState({ currentMin: minute, currentSec: second });
          }
        );
      }
    });
  }

  render() {
    const { url, currentSec, currentMin } = this.state;
    return (
      <div>
        <h1>Hello world - My first Extension</h1>
        <ReactPlayer url={`${url}&t=${currentMin}m${currentSec}s`} />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
