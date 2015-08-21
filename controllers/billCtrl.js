var Bill = require('../models/Bill');

module.exports = {
  create: function(req, res) {
    var newBill = new Bill(req.body);
    newBill.save(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.json(result);
    });
  }
};
