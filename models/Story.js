const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const storySchema = new Schema({
  collaborations: [{type: Schema.Types.ObjectId, ref: "Collab"}],
  users: [{type: Schema.Types.ObjectId, ref: "User"}],
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
  return this.populate("collaborations").execPopulate()
  .then(e => {
    return e.collaborations[0].content.split(" ").slice(0,2).join(" ").concat("...")
  })
};

storySchema.pre('save', function (next) {
  this.getFirstWords()
  .then(e =>{
    this.firstWords = e;
    next();
  })
})

const Story = mongoose.model('Story', storySchema);
module.exports = Story;
