
/**
 * Module dependencies.
 */

var express   = require('express')
  , app       = module.exports = express()
  , poet      = require('poet')(app)
  , mongoose  = require('mongoose')
  , stylus    = require('stylus')
  , db        = mongoose.connect('mongodb://localhost/test')

var config = require('./config.js');
app.configure(function(){
  app.enable('trust proxy');
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon( config.staticDir + '/imgs/favicon.ico'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('AbRsd4gSFffvhy$sfgb5#rs'));
  app.use(express.session());
  app.use(poet.middleware());
  app.use(app.router);
  app.use(stylus.middleware({
    src: config.staticDir,
    compress: true
  }));
  app.use(express.static(config.staticDir));
  app.set('port', config.port);
  if (config.errorPages) {
    //Dev settings
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
    app.set('port', process.env.PORT || 8080);
    app.use(express.logger('dev'));
  } else {
    //Production settings
    app.use(express.errorHandler());
    app.use(function(req,res,next){
      res.status(404);
      res.render('404', {url: req.url, title: '404 - page cannot be found'});
    })
  }
});

var models = require('./models/models')
models.setup(mongoose, db)

var user = new User();
user.created = new Date();
user.username = "TEST";
user.password = "PASS";
user.email = "someemail";
user.save();

// controllers - load them
// Controllers / routes must go after Configure
var controllers = ["pages", "blog"]
for (i in controllers) {
  console.log("loading controller: " + controllers[i])
  controller = require('./controllers/' + controllers[i]);
  controller.setup(app)
}


poet
  .createPostRoute()
  .createPageRoute()
  .createTagRoute()
  .createCategoryRoute()
  .init(function(locals) {
    locals.postList.forEach(function ( post ) {
      console.log('loading post: ' + post.url)
    })
  })


console.log("Express server listening at " + config.site + ":" + config.port);
app.listen(config.port);

