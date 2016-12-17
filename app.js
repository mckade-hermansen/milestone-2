var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var engine     = require('ejs-mate');
var pg         = require('pg');
var pgp        = require('pg-promise')();
var db         = pgp('postgres://arqqslcdlojgob:YI1GSuiaFz3SYbuwy6-HzNSdwc@ec2-54-243-252-91.compute-1.amazonaws.com:5432/dc0s0ln014emv5');
var path       = require('path');

app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(path.join(__dirname + '/css')));
app.use('/js', express.static(path.join(__dirname + '/js')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res, next){
  res.render('login');
});
app.get('/signup', function(req, res, next){
  res.render('signup');
});
app.get('/game', function(req, res, next){
  res.render('game');
});

app.get('/scoreboard', function(req, res, next){
  db.any('SELECT * FROM users ORDER BY highscore DESC')
  .then(function(data){
    console.log(data);
    return res.render('scoreboard', {data: data})
  })
  .catch(function(err){
    return next(err);
  });
});

app.post('/users/login', function(req, res, next){
  db.one('SELECT username, highscore FROM users WHERE username = ${username} ' +
  'AND password = ${password}', req.body)
  .then(function(data){
    console.log(data);
    return res.render('game', {data: data});
    //res.redirect('/game');
  })
  .catch(function(err){
    return res.render('login', {error_message: "Incorrect Username/password"});
  })
});
app.post('/users/new', function(req, res, next){
  db.none('SELECT username, password FROM users WHERE username = ${username}', req.body)
    .then(function(data){
      db.none('INSERT INTO users(username, password, highscore) '+
              'VALUES(${username}, ${password}, 0)', req.body)
        .then(function(data){
          db.one('SELECT username, highscore FROM users WHERE username = ${username} ' +
          'AND password = ${password}', req.body)
            .then(function(data){
              return res.render('game', {data: data});
            });
         });
    })
    .catch(function(data){
      res.render('signup', {data: data});
    });
});
app.post('/users/updateHighScore', function(req, res, next){
  db.one('UPDATE users SET highscore = ${score} WHERE username = ${name}', req.body)
  .then(function(){

  })
  .catch(function(err){
    res.redirect('/signup');
  })
});

app.listen(app.get('port'), function(){
  console.log('application running at localhost on port 5000');
});
