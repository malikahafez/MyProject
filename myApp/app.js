
var express = require('express');
const session = require('express-session');
var path = require('path');
var fs = require('fs');
var app = express();//initiation of the express server

// view engine setup
app.set('views', path.join(__dirname, 'views'));//tell server that all the html files will be in the views folder in the directory of MyProject
app.set('view engine', 'ejs');//tell engine to handle the views as ejs files not only html

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//setting folder for static files(videos, images, ...)
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// app.get('/',function(req, res){

function isAuthenticated(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/'); // Redirect to login if not logged in
  }
}


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

//handle request for login page after redirection from registration page
app.get('/login', function(req,res){
  res.render('login')
});

//go to homepage after logging in by clicking 'login'
app.post('/', async function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  try {
    // Query MongoDB to verify the user's credentials
    const user = await customerCollection.findOne({ username: username, password: password });

    if (user) {
      console.log('Login successful for:', username);
      req.session.username = username; // Store username in session
      res.redirect('/home'); // Redirect to the home page
    } else {
      console.log('Invalid credentials for:', username);
      res.send('<h1>Invalid username or password</h1><a href="/">Try again</a>');
    }
  } catch (err) {
    console.error('Error while logging in:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/home', isAuthenticated, function(req,res){
  res.render('home');
  
  console.log(req.session.username);
});
app.post('/register', async function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  try {
    
    // Check if the username already exists
    const existingUser = await customerCollection.findOne({ username: username });
    
    if (existingUser) {
      console.log('Username already taken:', username);
      res.send(`
        <h1>Username already exists</h1>
        <body>The username you entered is taken<body>
        <br><br>
        <a href="/Registration">Try again</a>
      `);
    } 
    else if(username == "" || password == ""){
      console.log('fields left empty');
      res.send(`
        <h1>Username or Password left empty</h1>
        <body> You left the username or the password fields empty<body>
        <br><br>
        <a href="/Registration">Try again</a>
      `);
    }
    else {
      // Insert the new user into the database
      await customerCollection.insertOne({ username: username, password: password, wanttogolist:[] });
      console.log('Registration successful for:', username);
      res.send(`<h1>Registration successful</h1>
         <a href="/">ok</a>
        `);// Redirect back to login page after successful registration
      
      //res.redirect('/'); 
    }
  } catch (err) {
    console.error('Error while registering:', err);
    res.status(500).send('Internal Server Error');
  }
});

//go to homepage after logging in after registering
//app.post('/login',function(req, res){
  //res.render('home')
//});

//go to wanttogo list after clicking button 'want to go list'
app.get('/wanttogo',isAuthenticated, async function(req,res){
  const username = req.session.username;

  try {
    const user = await customerCollection.findOne({ username: username });
    res.render('wanttogo', { username: username, wanttogolist: user.wanttogolist });
    console.log(user.wanttogolist);
  } catch (err) {
    console.error('Error fetching Want-to-Go List:', err);
    res.status(500).send('Internal Server Error');
  }
});


//go to islands page after clicking button 'view'
app.get('/islands',isAuthenticated, function(req,res){
  res.render('islands')
});
//go to bali page after clicking 'view'
app.get('/bali',isAuthenticated, function(req,res){
  res.render('bali')
});
//add bali to wanttogo list
app.post('/bali',async function(req,res){
  const username = req.session.username;

  try {
    const user = await customerCollection.findOne({ username: username });
    if(user.wanttogolist.includes('bali')){
      res.send(`
        <h1>Destination already exists in your Want-to-Go List</h1>
        <body>You can try adding another destination<body>
        <br><br>
        <a href="/bali">ok</a>
      `);
    }
    user.wanttogolist.push('bali');
    //res.render('wanttogo', { username: username, wanttogolist: user.wanttogolist });
    console.log(user.wanttogolist);
  } catch (err) {
    console.error('Error fetching Want-to-Go List:', err);
    res.status(500).send('Internal Server Error');
  }
});
//go to santorini page after clicking 'view'
app.get('/santorini',isAuthenticated, function(req,res){
  res.render('santorini')
});
//go to cities page after clicking 'view'
app.get('/cities',isAuthenticated, function(req,res){
  res.render('cities')
});
//go to paris page after clicking 'view'
app.get('/paris',isAuthenticated, function(req, res){
  res.render('paris')
});
//go to rome page after clicking 'view'
app.get('/rome',isAuthenticated, function(req, res){
  res.render('rome')
});
//go to hiking page after clicking 'view'
app.get('/hiking',isAuthenticated, function(req,res){
  res.render('hiking')
});
//go to inca page after clicking 'view'
app.get('/inca',isAuthenticated, function(req,res){
  res.render('inca')
});
//go to annapurna page after clicking 'view'
app.get('/annapurna',isAuthenticated, function(req,res){
  res.render('annapurna')
});
// app.post('/search', function(req,res){
//   res.render('searchresults')
// });
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
//console.log(x.name);//print to console


//const { MongoClient } = require('mongodb');
//const { name } = require('ejs');
//const client = new MongoClient("mongodb://127.0.0.1:27017");
//client.connect();
//const db = client.db('MyDB');
//db.collection('myCollection').insertOne({username: "test", password: "test"});
//db.collection('myCollection').insertOne({username: "ali1919", password: "abc123"});
//var l = {username: "ali1919", password: "abc123"};
//var m = JSON.stringify(l);
//fs.writeFileSync("users.json",m);
console.log(y);//print x in JSON format (one big string) can write this into a file
console.log(z);//print the parsed data as an object again


//mongoDB connection to database
var { MongoClient } = require('mongodb');
var client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
var db = client.db('MyDB');
var customerCollection = db.collection('myCollection');
//comment test users after the first run 
customerCollection.insertMany([
  { username: "test", password: "test", wanttogolist:['santorini','paris'] },
  { username: "ali1919", password: "abc123",wanttogolist:['bali']  },
  { username: "layla", password: "pass", wanttogolist:['annapurna'] }
]);
//access
// db.collection('myCollection').find().toArray(function(err,results){
//   console.log(results)
// });
// db.collection('myCollection').findOne({username: "test"}).then(result => {
//   console.log(result.username)
//   }); 


const availableLocations = [{ id: 1, name: "santorini" },
{ id: 2, name: "bali" },
{ id: 3, name: "paris" },
{ id: 4, name: "rome" },
{ id: 5, name: "annapurna" },
{ id: 6, name: "inca" },

];

// Search Route
app.post("/search",isAuthenticated, (req, res) => {
 
  const searchTerm = req.body.Search;
  console.log(searchTerm);
  try {
    // Execute a case-insensitive lookup in the availableLocations array
    const filteredLocations = availableLocations.filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.render("searchresults", {
      message: filteredLocations.length > 0 ? null : "No matching destinations found",
      locations: filteredLocations,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  
});

app.listen(3000);//port number 3000 for the website
//tell app server to listen for all requests from the local host on port 3000
