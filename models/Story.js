const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const storySchema = new Schema({
  image_url: String,
  collaborators: [{type: Schema.Types.ObjectId, ref: "User"}],
  status: Number,
  open: {type: Boolean, default: true}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Story = mongoose.model('Story', userSchema);
module.exports = Story;
