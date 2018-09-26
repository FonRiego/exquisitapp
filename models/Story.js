const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require('../models/User')
const Collab = require('../models/Collab')

const storySchema = new Schema({
  collaborations: [{type: Schema.Types.ObjectId, ref: "Collab"}],
  open: {
    type: Boolean,
    default: true
  },
  firstWords: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


storySchema.methods.getFirstWords = function(cb) {
  return this.populate("collaborations").collaborations[0].content.split(" ").slice(0,2).join(" ").concat("...")
  // this.model('Story').find({ type: this.type }, cb);
};

storySchema.pre('save', function (next) {
  this.firstWords = this.getFirstWords();
  next();
})

const Story = mongoose.model('Story', storySchema);
module.exports = Story;
