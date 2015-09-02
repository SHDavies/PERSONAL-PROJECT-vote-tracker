var Bill = require('../models/Bill');
var Comment = require('../models/Comment');
var User = require('../models/User');

module.exports = {
  create: function(req, res) {
    var newBill = new Bill(req.body);
    var billSaved;
    newBill.save(function(err, bill) {
      if (err) return res.status(500).send(err);
      newBill.populate('created_by').populate(function(err, bill) {
        User.findByIdAndUpdate(newBill.created_by, {$push: {'bill_posts': {bill: newBill._id}}}, function(err) {
          if (err) return res.status(500).send(err);
        });
        res.send(bill);
      });
    });
  },

  readAll: function(req, res) {
    Bill.find({})
    .populate('created_by')
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  updateVote: function(req, res) {
    var upVotes, downVotes;
    var vote = req.body.vote;
    var userId = req.body.userId;
    var billId = req.params.billId;
    Bill.findById(billId)
    .exec(function(err, result) {
      upVotes = parseInt(result.upvotes);
      downVotes = parseInt(result.downvotes);
    }).then(function() {
      switch (vote) {
        case 'up':
          upVotes++;
          Bill.findByIdAndUpdate(billId, {upvotes: upVotes}, function(err) {
            if (err) return res.status(500).send(err);
          });
          User.findByIdAndUpdate(userId, {$push: {'upvotes': {bill: billId}}}, {new: true, upsert: true}, function(err, user) {
            if (err) return res.status(500).send(err);
            else res.send(user);
          });
          break;
        case 'unUp':
          upVotes--;
          Bill.findByIdAndUpdate(billId, {upvotes: upVotes}, function(err) {
            if (err) return res.status(500).send(err);
          });
          User.findByIdAndUpdate(userId, {$pull: {'upvotes': {_id: req.body.voteId}}}, {new: true}, function(err, user) {
            if (err) return res.status(500).send(err);
            else res.send(user);
          });
          break;
        case 'downToUp':
          upVotes++;
          downVotes--;
          Bill.findByIdAndUpdate(billId, {upvotes: upVotes, downvotes: downVotes}, function(err) {
            if (err) return res.status(500).send(err);
          });
          User.findByIdAndUpdate(userId, {$pull: {'downvotes': {_id: req.body.voteId}}}, {new: true}, function(err) {
            if (err) return res.status(500).send(err);
          });
          User.findByIdAndUpdate(userId, {$push: {'upvotes': {bill: billId}}}, {new: true, upsert: true}, function(err, user) {
            if (err) return res.status(500).send(err);
            else res.send(user);
          });
          break;
        case 'down':
          downVotes++;
          Bill.findByIdAndUpdate(billId, {downvotes: downVotes}, function(err) {
            if (err) return res.status(500).send(err);
          });
          User.findByIdAndUpdate(userId, {$push: {'downvotes': {bill: billId}}}, {new: true, upsert: true}, function(err, user) {
            if (err) return res.status(500).send(err);
            else res.send(user);
          });
          break;
        case 'unDown':
          downVotes--;
          Bill.findByIdAndUpdate(billId, {downvotes: downVotes}, function(err) {
            if (err) return res.status(500).send(err);
          });
          User.findByIdAndUpdate(userId, {$pull: {'downvotes': {_id: req.body.voteId}}}, {new: true}, function(err, user) {
            if (err) return res.status(500).send(err);
            else res.send(user);
          });
          break;
        case 'upToDown':
          upVotes--;
          downVotes++;
          Bill.findByIdAndUpdate(billId, {upvotes: upVotes, downvotes: downVotes}, function(err) {
            if (err) return res.status(500).send(err);
          });
          User.findByIdAndUpdate(userId, {$pull: {'upvotes': {_id: req.body.voteId}}}, {new: true}, function(err) {
            if (err) return res.status(500).send(err);
          });
          User.findByIdAndUpdate(userId, {$push: {'downvotes': {bill: billId}}}, {new: true, upsert: true}, function(err, user) {
            if (err) return res.status(500).send(err);
            else res.send(user);
          });
          break;
      }
    });
  },

  getComments: function(req, res) {
    Bill.findById(req.params.billId)
    .populate('comments.comment')
    .exec(function(err, bill) {
      Bill.populate(
        bill,
        {path: 'comments.comment.commenter', model: 'User'},
        function (err, result) {
          if (err) return res.status(500).send(err);
          else res.send(result);
        }
      );
    });
  },

  postComment: function(req, res) {
    var commentId;
    var newComment = new Comment(req.body);
    newComment.save(function(err, result) {
      if (err) return res.status(500).send(err);
      else {
        commentId = result._id;
        User.findByIdAndUpdate(result.commenter, {$push: {'comments': {comment: commentId}}}, function(err) {
          if (err) return res.status(500).send(err);
        });
        Bill.findByIdAndUpdate(req.params.billId, {$push: {'comments': {comment: commentId}}}, {new: true, upsert: true, select: "comments"}, function(err, result) {
          if (err) res.status(500).send(err);
          else res.send(result);
        });
      }
    });
  }
};
