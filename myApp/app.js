
var express = require('express');
var path = require('path');
var app = express();//initiation of the express server

// view engine setup
app.set('views', path.join(__dirname, 'views'));//tell server that all the html files will be in the views folder in the directory of MyProject
app.set('view engine', 'ejs');//tell engine to handle the views as ejs files not only html

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//setting folder for static files(videos, images, ...)


// app.get('/',function(req, res){
//   res.render('index', {title: "express"})
// });

// app.get('/pizza',function(req,res){
//   res.render('pizzaPage',{ppp:"pizza"})
// });

// app.post('/pizza',function(req,res){
//   var x = req.body.user;
//   var y = req.body.pass;
//   console.log(x);
//   console.log(y);
// });

app.get('/',function(req,res){
  res.render('login')
});

app.post('/', function(req, res){
  res.render('home')
});

app.get('/islands', function(req,res){
  res.render('islands')
});

app.get('/bali', function(req,res){
  res.render('bali')
});

app.get('/santorini', function(req,res){
  res.render('santorini')
});

app.get('/cities', function(req,res){
  res.render('cities')
});

app.get('/paris', function(req, res){
  res.render('paris')
});

app.get('/rome', function(req, res){
  res.render('rome')
});

app.get('/hiking', function(req,res){
  res.render('hiking')
});

app.get('/inca', function(req,res){
  res.render('inca')
});

app.get('/annapurna', function(req,res){
  res.render('annapurna')
});


app.listen(3000);//port number 3000 for the website
//tell app server to listen for all requests from the local host on port 3000
