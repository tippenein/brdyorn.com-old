/* 
 * static page routes go here 
 */

var renderDirect = function(req, res, template, dict){
  res.render(template, dict)
}

exports.index = function(req, res){
  res.render('index', { title: 'BrdyOrn' });
};

exports.contact = function(req, res){
  res.render('contact', { title: 'Contact Brady Ouren'});
};
exports.about = function(req, res){
  res.render('about', { title: 'About Brady Ouren'});
};
exports.projects= function(req, res){
  res.render('projects', { title: 'Projects'});
};

exports.post_contact = function(req, res){
  name = req.body.name || 'Anonymous';
  email = req.body.email || 'None';
  message = req.body.message;
  console.log(name + " - " + email + " said: \n" + message);
  // send message to db 
};

exports.modesty = function(req, res){
  res.render('modesty', { title: "Mode-sty"});
};
