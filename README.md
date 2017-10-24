# mern-seed
  
The start point to rock with ReactJS and NodeJS.

## Installation

To install please follow these steps:

1. `npm install` over the root of the project
2. `npm run ux:init` this command will copy the files and structure in MSUXF to the folder ux for futher customizing
3. Copy `config/default.json` file and rename it to *development.json*. Set your configuration values.

## Connection String

Our seed uses MongoDB as database. To be able to connect to it we need a connection string URI.
There are different [formats](https://docs.mongodb.com/manual/reference/connection-string/#connection-string-uri-format) in which we can indicate the targte URL. From all those format we are using the following:

`mongodb://host:port`

That is specified in the config/<environment>.json file, whitin the mongodb.host property. As an example, this is how your development.json file might look like:

`
{
  "mongodb": {
    "host": "localhost:27017",
    ...
  },
  "api":{
    ...
  }
}
`

## Run

`npm start -s` this will start the project doing all the tasks (lint, tests, etc, and also keeping the watchers active)

## Problem solving

If this is the first time you are runnig the app, you could have some issues while whatching the app's files.
The error will look like something like this:

`Waiting...Fatal error: watch ENOSPC`

If that s your case you might have to setup the amount of files the system can watch. For instance if you are a Linux user you can try [this](https://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) solution.

## Tech Stack

### Backend
- Node
- Express

### Frontend
- React
- Redux 

### UX
- Sass 

### Testing
- Mocha
- Expect 
- Enzyme
- jsdom

### Javascript version
- ECMA2015/ES6

### Tools
- Webpack

### UI Libraries
- Bootstrap
- Toastr

## CLI

We include a CLI tool that you can use to generate some useful stuff. Read [the docs](cli/README.md).
