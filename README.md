# Youtube Resume Chrome Extension

Don't let your YouTube browsing history fade away

<table><tr><td vlign="center"><img src="https://cdn.auth0.com/blog/react-js/react.png" width="50"> <img src="https://img.pngio.com/button-plus-icon-icon-plus-symbol-png-and-vector-with-plus-icon-png-640_640.png" width="20"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/1024px-Google_Chrome_icon_%28September_2014%29.svg.png" width="45"> </td></tr></table>



## Installation
>Make sure you have latest **NodeJs** version installed

Clone repo

```
git clone git@github.com:sbeaury/youtube-resume.git
```
Go to `youtube-resume` directory run

```
yarn install
```
Now build the extension using
```
yarn build
```
You will see a `build` folder generated inside `[PROJECT_HOME]`

## Adding React app extension to Chrome

In Chrome browser, go to chrome://extensions page and switch on developer mode. This enables the ability to locally install a Chrome extension.

Now click on the `LOAD UNPACKED` and browse to `[PROJECT_HOME]\build`. This will install the React app as a Chrome extension.

When opening a new tab, extension will be triggered.


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/sbeaury/youtube-resume. 


## License

The repo is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).