var User = require('../models/User');

module.exports = {
  createUser: function(req, res) {
    var newUser = new User();
    newUser.username = req.body.username;
    newUser.password = newUser.generateHash(req.body.password);
    newUser.save(function(err, user) {
      if (err) return res.status(500).send(err);
      else res.send(user);
    });
  }
};
