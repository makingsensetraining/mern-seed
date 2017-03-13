const <%= pluralizedName %> = [];

class <%= ucName %>Service {
  constructor() {
    this.nextId = 0;

    // Seed with some dummy data.
    for (let i = 1; i <= 10; i++) {
      var id = this._generateNextId();
      <%= pluralizedName %>.push({
        id: id,
        name: `Test Name ${id}`
      });
    }
  }

  findAll(cb) {
    let all<%= pluralizedUcName %> = <%= pluralizedName %>;

    return cb(null, all<%= pluralizedUcName %>);
  }

  findById(id, cb) {
    const <%= name %> = <%= pluralizedName %>.find(<%= name %> => <%= name %>.id == id);

    return cb(null, <%= name %>);
  }

  create(<%= name %>, cb) {
    <%= name %>.id = this._generateNextId();
    <%= pluralizedName %>.push(<%= name %>);

    return cb(null, <%= name %>);
  }

  update(id, data, cb) {
    // Finding the index is only for memory storage.
    const indexOf<%= ucName %>ToUpdate = <%= pluralizedName %>.findIndex((<%= name %>) => { return <%= name %>.id == id });
    if (indexOf<%= ucName %>ToUpdate === -1)
      return cb(`The <%= name %> doesn't exist.`);

    // Get the "stored" record in memory and update with the new data.
    let <%= name %> = <%= pluralizedName %>.find(<%= name %> => <%= name %>.id == id);
    Object.assign(<%= name %>, data);

    // Put the updated record on memory.
    <%= pluralizedName %>.splice(indexOf<%= ucName %>ToUpdate, 1, <%= name %>);

    return cb(null, <%= name %>);
  }

  delete(id, cb) {
    const indexOf<%= ucName %>ToDelete = <%= pluralizedName %>.findIndex((<%= name %>) => { return <%= name %>.id == id });
    if (indexOf<%= ucName %>ToDelete === -1)
      return cb(`The <%= name %> doesn't exist.`);

    <%= pluralizedName %>.splice(indexOf<%= ucName %>ToDelete, 1);

    return cb(null, id);
  }

  _generateNextId() {
    this.nextId += 1;
    return this.nextId;
  }
}

export default new <%= ucName %>Service();
