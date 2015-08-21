var mongoose = require('mongoose');

var billSchema = new mongoose.Schema({
  official_title: {type: String, unique: true},
  short_title: {type: String, required: true, unique: true},
  description: {type: String},
  status: {type: String, enum: ['successful', 'failed', 'in progress']},
  results: {
    house_votes: {
      aye: {type: Number, min: 0, max: 440},
      nay: {type: Number, min: 0, max: 440},
      present: {type: Number, min: 0, max: 440}
    },
    senate_votes: {
      aye: {type: Number, min: 0, max: 440},
      nay: {type: Number, min: 0, max: 440},
      present: {type: Number, min: 0, max: 440}
    }
  },
  upvotes: {type: Number, min: 0, default: 0},
  downvotes: {type: Number, min: 0, default: 0},
  created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  comments: [{
    comment: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
  }]
});

module.exports = mongoose.model('Bill', billSchema);
