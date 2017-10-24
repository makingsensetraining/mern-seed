import config from 'config';
import mongoose from 'mongoose';
import mongooseIdPlugin from './mongooseIdPlugin';

const dbConfig = config.get('mongodb');
const dbOptions = {
  server: {
    socketOptions: dbConfig.socketOptions
  }
};

mongoose.connect(`mongodb://${dbConfig.host}`, dbOptions);
mongoose.Promise = global.Promise; // Plug native ES6 promises http://mongoosejs.com/docs/promises.html
mongoose.plugin(mongooseIdPlugin); // Applies plugin to all schemas.

const mongodbConnection = mongoose.connection;

mongodbConnection.on('error', (error) => {
  console.log('Error connecting to mongodb server.', error.message);
});

process.on('SIGINT', () => {
  mongodbConnection.close(() => {
    console.log('Disconnected from mongodb server through app termination.');
    process.exit(0);
  });
});

export default mongodbConnection;
