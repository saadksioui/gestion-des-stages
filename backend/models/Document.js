const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  file:{
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now(),
},
}, );

module.exports = mongoose.model('Document', DocumentSchema);
