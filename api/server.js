import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config';
import open from 'open';
import mongodbConnection from './database/mongodb';
import apiConfig from 'config';
import addApiRoutes from './addApiRoutes'

/* eslint-disable no-console */

const app = express();
const compiler = webpack(config);

app.use(express.static(__dirname + '../app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(require('webpack-hot-middleware')(compiler));

addApiRoutes(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});

mongodbConnection.once('open', () => {
  console.log('Mongodb server connected.');

  app.listen(apiConfig.api.port, (err) => {
    if (err) return console.log(err);
    open(`${apiConfig.api.host}:${apiConfig.api.port}`);
  });
});
