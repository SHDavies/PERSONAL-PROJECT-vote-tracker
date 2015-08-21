var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express();

/////////////Controllers/////////////
var billCtrl = require('./controllers/billCtrl'),
    userCtrl = require('./controllers/userCtrl');

/////////////Middleware/////////////
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./public'));

/////////////Endpoints/////////////
app.post('/bill', billCtrl.create);

/////////////Connections/////////////
var mongoUri = 'mongodb://localhost:27017/vote-tracker';

mongoose.set('debug', true);
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at ', mongoUri);
});

app.listen(4000, function() {
  console.log('Listening on port 4000');
});
