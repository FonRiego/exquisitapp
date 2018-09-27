const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  user: {type: Schema.Types.ObjectId, ref: "User"},
  story: {type: Schema.Types.ObjectId, ref: "Story"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
