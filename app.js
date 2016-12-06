var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var engine     = require('ejs-mate');
//var pgp        = require('pg-promise')();
//var db         = pgp('postgres://localhost:5432/generator');
var path       = require('path');

app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(path.join(__dirname + '/css')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res, next){
  res.render('login');
});
app.get('/signup', function(req, res, next){
  res.render('signup');
});

// app.post('/loginForm', function(req, res, next){
//
// });
// app.post('/new', function(req, res, next){
//   db.none('insert into posts(username, password, highscore)' +
//     'values(${username}, ${password}, ${highscore})', req.body)
//     .then(function(){
//       res.redirect('/game');
//     })
//     .catch(function(err){
//       return next(err);
//     });
// });

app.listen(3000, function(){
  console.log('application running at localhost on port 3000');
});
