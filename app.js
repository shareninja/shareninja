
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , models = require('./models')
  , lib = require('./lib')
  , RedisStore = require('connect-redis')(express)
  , file = require('./routes/file')
  , index = require('./routes/topics/index.js')
  , profile = require('./routes/topics/profile.js')
  , users = require('./routes/users/index.js')
  , sessions = require('./routes/sessions/index.js')
  , thankyou = require('./routes/sessions/thankyou.js')
  , change =require('./routes/lib/index.js')
  , confirm = require('./routes/newPass/index.js')
  , socket_io = require('socket.io')
  , userSearch = require('./routes/userSearch/index.js')
  , forum = require('./routes/forum/forum.js')
  , notifications = require('./routes/notifications/index.js')
  , http = require('http')
  , serverio = require('./serverio/index.js')
  , Notification = models.NotifModel
  ;
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  // app.redirect('top', '/topics');
  app.use(express.favicon());
  app.use(lib.parallel(
    express.bodyParser(),
    express.cookieParser()
  ));
  app.use(lib.parallel(
    express.methodOverride(),
    express.session({
      secret: 'your secret here',
      store: new RedisStore(),
      cookie: {
        maxAge: false
      }
    })
  ));
  app.use(express.logger({
    stream: lib.logStream,
    buffer: 500
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(lib.notFound('http://share-ninja'));
});

app.configure('development', function(){
  models.init('localhost', 'forum_dev');
});

app.configure('production', function(){
  models.init('localhost', 'forum_prod');
});

app.configure('test', function() {
  models.init('localhost', 'forum_test');
});

// View Helper
app.helpers(lib.helpers);

// Dynamic View Helper
app.dynamicHelpers(lib.dynamicHelpers);

// Routes

// GET /
app.get('/', lib.loginRequired, routes.index);

// GET /topics
app.get('/topics', lib.loginRequired, index.show);

// GET /profile
app.get('/topics/profile', lib.loginRequired, profile.show);

// GEt /deleteAccount
app.get('/topics/deleteAccount', lib.loginRequired, profile.deleteShow);

// GET /topics/changePassword
app.get('/lib/changePassword', lib.loginRequired, change.changePassword);

app.get('/newPass/changeToNewPassword', lib.loginRequired, confirm.showPass);

// GET /sessions/new
app.get('/sessions/new', sessions.new);

//GET /notifications
app.get('/notifications', lib.loginRequired, notifications.show);

//GET /userSearch
app.get('/userSearch', userSearch.show);

//GET /forum
app.get('/forum', forum.show);

// GET /sessions/thankyou
app.get('/sessions/thankyou', thankyou.show);

// GET /sessions/destroy
app.get('/sessions/destroy', sessions.delete);


// POST /sessions
app.post('/sessions', sessions.create);

// POST /users
app.post('/users', users.create);

// POST /lib
app.post('/lib', change.checkOldPassword);

// POST /delete
app.post('/delete', profile.deleteAccount);

// POST /newPass
app.post('/newPass', confirm.changeToNewPassword);

app.get('/upload', lib.loginRequired, file.upload);
app.post('/upload', file.post);
app.get('/download/:file', lib.loginRequired, file.download);
app.get('/folder/:id', lib.loginRequired, file.folder);

// Error Handler
app.error(lib.notFoundHandler);
app.error(lib.errorHandler);
app.listen(3000);

//serverside socket setup

var io = socket_io.listen(app);
io.sockets.on('connection', function(socket){
	serverio.listen(socket);
});
console.log("Express server listening on port %d in %s mode", '3000', app.settings.env);
