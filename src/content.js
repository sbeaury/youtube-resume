/* global chrome */

import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import { css } from "emotion";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TabIcon from "@material-ui/icons/Tab";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const getLocalStorageValue = async key => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, function(value) {
        resolve(value);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const removeDuplicates = arrayOfObjects => {
  return arrayOfObjects.filter(
    (object, index) =>
      index ===
      arrayOfObjects.findIndex(
        obj => JSON.stringify(obj) === JSON.stringify(object)
      )
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
  }

  componentDidMount() {
    getLocalStorageValue("myKey").then(result => {
      if (result.myKey !== undefined) {
        this.setState({ videos: result.myKey });
      }
    });

    const queryInfo = {
      url: "*://www.youtube.com/*"
    };

    chrome.tabs.query(queryInfo, result => {
      let arrayVideos = removeDuplicates([...this.state.videos]);
      console.log("arrayVideos", arrayVideos);
      if (result !== undefined) {
        for (let i = 0; i < result.length; i++) {
          let url = result[i].url;
          console.log("result:", result, "url:", url);
          chrome.tabs.executeScript(
            result[i].id,
            { code: 'document.querySelector("video").currentTime' },
            results => {
              const time = results && results[0];
              const minute = Math.round(time / 60);
              const second = Math.round(time % 60);
              let arrayOfObjects = Object.assign(...arrayVideos, {
                url: url,
                currentMin: minute,
                currentSec: second
              });

              arrayVideos = removeDuplicates([arrayOfObjects]);

              this.setState({ videos: arrayVideos });

              chrome.storage.sync.set(
                { myKey: this.state.videos },
                console.log("Video array saved!")
              );
            }
          );
        }
      }
    });
  }

  handleClearCache = () => {
    chrome.storage.sync.remove("myKey", () => {
      window.location.reload();
      console.log("Cache has been cleared");
    });
  };

  render() {
    const { videos } = this.state;
    return (
      <div
        className={css`
          background: linear-gradient(
            to top,
            #eb7c9c,
            #d677a1,
            #bf73a2,
            #a870a1,
            #916c9c
          );
          background-repeat: no-repeat;
          background-size: cover;
          width: 100%;
          height: 100%;
          background-attachment: fixed
          color: black;
          font-family: "Open Sans";    
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
            <h1>Don't let your YouTube browsing history fade away</h1>
          </div>
          {videos.length === 0 ? null : (
            <div
              className={css`
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin-bottom: 3rem;
              `}
            >
              <Tooltip
                title="Clear history"
                position="bottom"
                trigger="mouseenter"
                arrow={false}
              >
                <IconButton aria-label="delete">
                  <DeleteIcon onClick={this.handleClearCache} />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Default Chrome tab"
                position="bottom"
                trigger="mouseenter"
                arrow={false}
              >
                <IconButton aria-label="delete">
                  <TabIcon
                    onClick={() => {
                      chrome.tabs.getCurrent(tab => {
                        chrome.tabs.update(tab.id, {
                          url: "chrome-search://local-ntp/local-ntp.html"
                        });
                      });
                    }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
        <div
          className={css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 90%;
            height: 70vh;
            justify-content: center;
            margin: auto;
            background-size: cover;
          `}
        >
          {videos.length === 0 ? (
            <div
              className={css`
                margin: auto;
              `}
            >
              <img src="https://img.icons8.com/nolan/2x/empty-box.png" />
            </div>
          ) : videos ? (
            videos.map(object => {
              return (
                <ReactPlayer
                  url={`${object.url}&t=${object.currentMin}m${object.currentSec}s`}
                  width="20%"
                  height="20%"
                  className={css`
                  margin: 1rem;
                  border: 3px solid #333333;          
                  }
                `}
                />
              );
            })
          ) : (
            <h1
              className={css`
                margin: auto;
              `}
            >
              Something went wrong ¯\_(ツ)_/¯
            </h1>
          )}
        </div>
        <footer
          className={css`
            display: flex;
            justify-content: center;
            font-weight: bold;
            font-size: 1rem;
          `}
        >
          <span>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/sbeaury/"
              className={css`
                display: flex;
                justify-content: center;
                font-weight: bold;
                font-size: 1rem;
              `}
              className={css`
                color: inherit;
                text-decoration: none !important;
                &:hover {
                  color: #916c9c;
                }
              `}
            >
              Sebastien Beaury
            </a>
            , Built with{" "}
            <a
              href="https://reactjs.org/"
              className={css`
                color: inherit;
                text-decoration: none !important;
                &:hover {
                  color: #916c9c;
                }
              `}
            >
              React
            </a>
          </span>
        </footer>
      </div>
    );
  }
}

export default App;
