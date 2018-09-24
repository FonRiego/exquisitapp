const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const collabSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref:'User'},
  content: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Collab = mongoose.model('Collab', collabSchema);
module.exports = Collab;
