import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config';
import open from 'open';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

//ToDo: Make it work mongoose.
//const mongodbUrl = "mongodb://mslabs:1qaz2wsx@ds111178.mlab.com:11178/react_blog";

// let db = mongoose.connect(mongodbUrl, {}, (err) => {
//   if (err) return console.log('ERROR connecting to: mongodb ' + err);
//   console.log('Successfully connected to: mongodb');
// });

app.use(express.static(__dirname + '../app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, { noInfo: true,publicPath: config.output.publicPath }));
app.use(require('webpack-hot-middleware')(compiler));
app.use(require('./user/index.js'));

app.get("/*", (req, res) => {
  res.sendFile(path.join( __dirname, '../app/index.html'));
}).listen(port, (err) => {
  if (err) return  console.log(err);
  open(`http://localhost:${port}`);
});
