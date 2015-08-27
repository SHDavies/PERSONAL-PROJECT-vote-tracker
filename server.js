var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    passport = require('passport'),
    privateInfo = require('./private/keys'),
    app = express();

/////////////Controllers/////////////
var billCtrl = require('./controllers/billCtrl'),
    userCtrl = require('./controllers/userCtrl');

/////////////Middleware/////////////

//config passport//
require('./config/passport')(passport);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(session({secret: privateInfo.secret}));
app.use(passport.initialize());
app.use(passport.session());


/////////////Endpoints/////////////
app.post('/bill', billCtrl.create);
app.get('/bill', billCtrl.readAll);
app.get('/bill/comments/:billId', billCtrl.getComments);
app.put('/bill/:billId', billCtrl.updateVote);
app.post('/bill/comments/:billId', billCtrl.postComment);
app.post('/user/new', userCtrl.createUser);

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
