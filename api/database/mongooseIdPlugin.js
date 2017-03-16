export default function mongooseIdPlugin(schema, options) {
  schema.options.toJSON.transform = function (doc, ret, options) {
    delete ret._id; // Remove internal _id property before exposing it as JSON.
    return ret;
  };
  schema.set('toJSON', schema.options.toJSON);
}
