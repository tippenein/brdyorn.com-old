/* app / express configurations live here */

module.exports = function(app, express){
  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon(__dirname + '/public/imgs/favicon.ico'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('AbRsd4gSFffvhy$sfgb5#rs'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });
  //Dev settings
  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
    app.set('port', process.env.PORT || 8080);
    app.use(express.logger('dev'));
  });
  //Production settings
  app.configure('production', function(){
    app.use(express.errorHandler());
    app.use(function(req,res,next){
      res.status(404);
      res.render('404', {url: req.url, title: '404'});
    })
    app.set('port', 80);
  });
};
