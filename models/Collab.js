const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const collabSchema = new Schema({
  story: {type: Schema.Types.ObjectId, ref:'Story'},
  user: {type: Schema.Types.ObjectId, ref:'User'},
  content: String,
  collabType: {
    type: String,
    enum: [1, 2, 3]
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Collab = mongoose.model('Collab', collabSchema);
module.exports = Collab;
