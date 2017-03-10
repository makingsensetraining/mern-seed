import moment from 'moment';

const users = [];

class UserService {
  constructor() {
    this.nextId = 0;

    // Seed with some dummy data.
    for (let i = 1; i <= 10; i++) {
      var id = this._generateNextId();
      users.push({
        id: id,
        name: `User Name ${id}`,
        email: `user-email-name-${id}@test.com`,
        createdAt: '2016-12-29'
      });
    }
  }

  findAll(cb) {
    let allUsers = users;

    return cb(null, allUsers);
  }

  findById(id, cb) {
    const user = users.find(user => user.id == id);

    return cb(null, user);
  }

  create(user, cb) {
    user.id = this._generateNextId();
    user.createdAt = moment().format('YYYY-MM-DD');
    users.push(user);

    return cb(null, user);
  }

  update(id, data, cb) {
    // Finding the index is only for memory storage.
    const indexOfUserToUpdate = users.findIndex((user) => { return user.id == id });
    if (indexOfUserToUpdate === -1)
      return cb(`The user doesn't exist.`);

    // Get the "stored" record in memory and update with the new data.
    let user = users.find(user => user.id == id);
    Object.assign(user, data);

    // Put the updated record on memory.
    users.splice(indexOfUserToUpdate, 1, user);

    return cb(null, user);
  }

  delete(id, cb) {
    const indexOfUserToDelete = users.findIndex((user) => { return user.id == id });
    if (indexOfUserToDelete === -1)
      return cb(`The user doesn't exist.`);

    users.splice(indexOfUserToDelete, 1);

    return cb(null, id);
  }

  _generateNextId() {
    this.nextId += 1;
    return this.nextId;
  }
}

export default new UserService();
