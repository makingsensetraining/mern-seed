import mongoose from 'mongoose';
import config from 'config';

const dbConfig = config.get('mongodb');
mongoose.connect(`mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.dbname}`);
const mongodbConnection = mongoose.connection;

mongodbConnection.on('error', (error) => {
  console.log('Error connecting to mongodb server.', error.message);
});

mongodbConnection.once('open', () => {
  console.log('Mongodb server connected.');
});

export default mongodbConnection;
