const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const storySchema = new Schema({
  image_url: String,
  collaborations: [{type: Schema.Types.ObjectId, ref: "Collab"}],
  open: Boolean,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Story = mongoose.model('Story', storySchema);
module.exports = Story;
