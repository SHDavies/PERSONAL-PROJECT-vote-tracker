var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, unique: true},
  bill_posts: [{
    bill: {type: mongoose.Schema.Types.ObjectId, ref: 'Bill'}
  }],
  upvotes: [{
    bill: {type: mongoose.Schema.Types.ObjectId, ref: 'Bill'}
  }],
  downvotes: [{
    bill: {type: mongoose.Schema.Types.ObjectId, ref: 'Bill'}
  }],
  comments: [{
    comment: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
  }]
});

module.exports = mongoose.model('User', userSchema);
