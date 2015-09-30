var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
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

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
