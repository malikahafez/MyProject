
var express = require('express');
var path = require('path');
var fs = require('fs');
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
//show login page when localhost:3000 is in browser
app.get('/',function(req,res){
  res.render('login')
});
//go to registration page after clicking 'I dont have an account'
app.get('/registration', function(req,res){
  res.render('registration')
});
//redirect to login page after registering by clicking 'register'
app.post('/register', function(req,res){
  res.redirect('login')
});
//handle request for login page after redirection from registration page
app.get('/login', function(req,res){
  res.render('login')
});

//go to homepage after logging in by clicking 'login'
app.post('/', function(req, res){
  res.render('home')
});
//go to homepage after logging in after registering
app.post('/login',function(req, res){
  res.render('home')
});

//go to wanttogo list after clicking button 'want to go list'
app.get('/wanttogo', function(req,res){
  res.render('wanttogo')
});

//go to islands page after clicking button 'view'
app.get('/islands', function(req,res){
  res.render('islands')
});
//go to bali page after clicking 'view'
app.get('/bali', function(req,res){
  res.render('bali')
});
//go to santorini page after clicking 'view'
app.get('/santorini', function(req,res){
  res.render('santorini')
});
//go to cities page after clicking 'view'
app.get('/cities', function(req,res){
  res.render('cities')
});
//go to paris page after clicking 'view'
app.get('/paris', function(req, res){
  res.render('paris')
});
//go to rome page after clicking 'view'
app.get('/rome', function(req, res){
  res.render('rome')
});
//go to hiking page after clicking 'view'
app.get('/hiking', function(req,res){
  res.render('hiking')
});
//go to inca page after clicking 'view'
app.get('/inca', function(req,res){
  res.render('inca')
});
//go to annapurna page after clicking 'view'
app.get('/annapurna', function(req,res){
  res.render('annapurna')
});
app.post('/search', function(req,res){
  res.render('searchresults')
});
//javascript object notation(json)
//var var_name = {variable:value, variable:value};
//object can have multiple data types within it
var x = {name:"Ali", age:27, username:"ali92", password:"abc123"};//javascript object
var y = JSON.stringify(x);//x turned into string in JSON format

//write y into a file (users.json) using fs module
fs.writeFileSync("users.json",y);

//read from file
var data = fs.readFileSync("users.json");

//turn string back into object by parsing data variable
var z = JSON.parse(data);


console.log(x);//print x as an object can't write this into a file
console.log(y);//print x in JSON format (one big string) can write this into a file
console.log(z);//print the parsed data as an object again
//console.log(x.name);//print to console
app.listen(3000);//port number 3000 for the website
//tell app server to listen for all requests from the local host on port 3000
