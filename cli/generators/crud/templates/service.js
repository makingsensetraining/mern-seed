import <%= ucName %> from './<%= name %>.schema';

class <%= ucName %>Service {
  findAll(cb) {
    <%= ucName %>.find()
      .then(<%= pluralizedName %> => cb(null, <%= pluralizedName %>))
      .catch(err => cb('Unable to retrieve <%= pluralizedName %>.'));
  }

  findById(id, cb) {
    <%= ucName %>.findById(id)
      .then(<%= name %> => cb(null, <%= name %>))
      .catch(err => cb('Unable to find <%= name %>.'));
  }

  create(data, cb) {
    let <%= name %> = new <%= ucName %>(data);
    <%= name %>.save();
    return cb(null, <%= name %>);
  }

  update(id, data, cb) {
    delete data.id;

    <%= ucName %>.findByIdAndUpdate(id, data, { new: true }) // Using { new: true } to return the modified document rather than the original.
      .then((<%= name %>) => {
        if (!<%= name %>) return cb(`The <%= name %> doesn't exist.`);
        cb(null, <%= name %>);
      })
      .catch(err => cb('Unable to update <%= name %>.'));
  }

  delete(id, cb) {
    <%= ucName %>.findByIdAndRemove(id, { select: '_id' })
      .then((<%= name %>) => {
        if (!<%= name %>) return cb(`The <%= name %> doesn't exist.`);
        cb(null, id);
      })
      .catch(err => cb('Unable to delete <%= name %>.'));
  }
}

export default new <%= ucName %>Service();
