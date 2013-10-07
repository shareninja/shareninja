
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , update = require('./routes/new.js')
  , lib = require('./lib/index.js')
  , models = require('model')
  , socketIO = require('socket.io')
  , flash = require('connect-flash')
  , auth = require('./routes/auth.js')(models)
  ;

var app = module.exports = express.createServer();
var io = socketIO.listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(flash());
  // redirect
});

// Routes
app.get('/', lib.loginRequired, routes.index);

// Routes for topics
app.get('/new', update.new);
app.get('/auth/logout', lib.loginRequired, auth.logout);
app.get('/auth/login', lib.loginRequired, auth.login);
app.get('/auth/signup', lib.loginRequired, auth.signup);

// POST for topics
app.post('/auth/signup', auth.signup);
app.post('/auth/login', auth.login);
app.post('/auth/logout', auth.logout);

// DynamicHelpers
app.dynamicHelpers(lib.dynamicHelpers);

// Error Handlers
app.error(lib.errorHandler);
app.error(lib.notFoundHandler);
app.use(lib.notFound('http://NinjaShare'));


app.listen(3003);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


// ---------- socket.io ------------ //
io.sockets.on('connection', function(socket){
  console.log("Connected to socket.io");
// When received posts
  socket.on('posts', function(data){
// Sends data
  console.log("JamJam has been sent");
  io.sockets.emit('posts', {value: data.value}); 
  });
});







