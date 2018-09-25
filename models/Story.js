const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const storySchema = new Schema({
  collaborations: [{type: Schema.Types.ObjectId, ref: "Collab"}],
  open: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Story = mongoose.model('Story', storySchema);
module.exports = Story;
