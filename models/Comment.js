var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  comment: {type: String, required: true},
  commenter: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  timestamp: {type: Date, default: Date.now}
});
