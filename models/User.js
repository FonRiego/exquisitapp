const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create')



const userSchema = new Schema({
  username: String,
  password: String,
  avatarName: String,
  avatarPath: {type: String, default:"/images/user_placeholder.png"},
  facebookId: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);
module.exports = User;
