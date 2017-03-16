import User from './user.schema';

class UserService {
  findAll(cb) {
    User.find()
      .then(users => cb(null, users))
      .catch(err => cb('Unable to retrieve users.'));
  }

  findById(id, cb) {
    User.findById(id)
      .then(user => cb(null, user))
      .catch(err => cb('Unable to find user.'));
  }

  create(data, cb) {
    let user = new User(data);
    user.save();
    return cb(null, user);
  }

  update(id, data, cb) {
    delete data.id;

    User.findByIdAndUpdate(id, data, { new: true }) // Using { new: true } to return the modified document rather than the original.
      .then((user) => {
        if (!user) return cb(`The user doesn't exist.`);
        cb(null, user);
      })
      .catch(err => cb('Unable to update user.'));
  }

  delete(id, cb) {
    User.findByIdAndRemove(id, { select: '_id' })
      .then((user) => {
        if (!user) return cb(`The user doesn't exist.`);
        cb(null, id);
      })
      .catch(err => cb('Unable to delete user.'));
  }
}

export default new UserService();
