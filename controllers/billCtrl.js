var Bill = require('../models/Bill');
var Comment = require('../models/Comment');

module.exports = {
  create: function(req, res) {
    var newBill = new Bill(req.body);
    newBill.save(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.json(result);
    });
  },

  readAll: function(req, res) {
    Bill.find({})
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  updateVote: function(req, res) {
    var upVotes, downVotes;
    var vote = req.body.vote;
    var billId = req.params.billId;
    Bill.findById(billId)
    .exec(function(err, result) {
      upVotes = parseInt(result.upvotes);
      downVotes = parseInt(result.downvotes);
    }).then(function() {
      switch (vote) {
        case 'up':
          upVotes++;
          Bill.findByIdAndUpdate(billId, {upvotes: upVotes}, {select: 'upvotes'}, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.json(result);
          });
          break;
        case 'unUp':
          upVotes--;
          Bill.findByIdAndUpdate(billId, {upvotes: upVotes}, {select: 'upvotes'}, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.json(result);
          });
          break;
        case 'downToUp':
          upVotes++;
          downVotes--;
          Bill.findByIdAndUpdate(billId, {upvotes: upVotes, downvotes: downVotes}, {select: 'upvotes downvotes'}, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.json(result);
          });
          break;
        case 'down':
          downVotes++;
          Bill.findByIdAndUpdate(billId, {downvotes: downVotes}, {select: 'downvotes'}, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.json(result);
          });
          break;
        case 'unDown':
          downVotes--;
          Bill.findByIdAndUpdate(billId, {downvotes: downVotes}, {select: 'downvotes'}, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.json(result);
          });
          break;
        case 'upToDown':
          upVotes--;
          downVotes++;
          Bill.findByIdAndUpdate(billId, {upvotes: upVotes, downvotes: downVotes}, {select: 'upvotes downvotes'}, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.json(result);
          });
          break;
      }
    });
  },

  getComments: function(req, res) {
    Bill.findById(req.params.billId)
    .populate('comments')
    .exec(function(err, result) {
      console.log(err);
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  postComment: function(req, res) {
    var commentId;
    var newComment = new Bill(req.body);
    newComment.save(function(err, result) {
      if (err) return res.status(500).send(err);
      else {
        commentId = result._id;
      }
    });
  }
};
