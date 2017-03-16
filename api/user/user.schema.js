import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.set('toJSON', { getters: true, versionKey: false });

const User = mongoose.model('User', userSchema);

export default User;
