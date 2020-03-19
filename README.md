# Youtube Resume Chrome Extension

Don't let your YouTube browsing history fade away

Based on <img src="https://pngimage.net/wp-content/uploads/2018/06/react-logo-png-6.png" width="50">

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