import mongoose from 'mongoose';

const <%= name %>Schema = mongoose.Schema({
  name: String
});

<%= name %>Schema.set('toJSON', { getters: true, versionKey: false });

const <%= ucName %> = mongoose.model('<%= ucName %>', <%= name %>Schema);

export default <%= ucName %>;
