## The App

The app is a base Ionic 3 application that highlights using Observable, Pull to Refresh, List Option Buttons, and In App Browser support.

Once you clone the project, open a terminal and change directories to the cloned project.

Then type `npm install`

Check to ensure that the browser platform has been added by typing `ionic cordova platform list`. If it is not there, add the browser platform to the project by typing `ionic cordova platform add browser`.

Check to ensure that the InAppBrowser plugin has been added by typing `ionic cordova plugin list`. If it is not there, add the InAppBrowser plugin to the project by typing `ionic cordova plugin add cordova-plugin-inappbrowser`.

##JSON Server##
This demo relies on json-server.

To use npm to install install json-server
`npm install -g json-server`
(https://www.npmjs.com/package/json-server)[https://www.npmjs.com/package/json-server]

For more information about json-server visit
(https://github.com/typicode/json-server)[https://github.com/typicode/json-server]

There is a file in the data directory called data.json. This is a starter database. To run it navigate to that the `data` directory and type: `json-server data.json`. This will start the server on port 3000.

All the items are articles
* http://localhost:3000/articles will return a list of artciles
* http://localhost:3000/articles/1 will return an article for id 1


