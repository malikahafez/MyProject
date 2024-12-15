var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express(); // Initiation of the express server
// In-memory Want-to-Go List
let wantToGoList = [];

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Show login page when localhost:3000 is in browser
app.get('/', function (req, res) {
    res.render('login');
});

// Go to registration page after clicking 'I don't have an account'
app.get('/registration', function (req, res) {
    res.render('registration');
});

// Redirect to login page after registering
app.post('/register', function (req, res) {
    res.redirect('login');
});

// Handle request for login page after redirection
app.get('/login', function (req, res) {
    res.render('login');
});

// Go to homepage after logging in
app.post('/', function (req, res) {
    res.render('home');
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

var data = fs.readFileSync("users.json");
var z = JSON.parse(data);
console.log(x);
console.log(y);
console.log(z);

// MongoDB Connection
const { MongoClient } = require('mongodb');
const { name } = require('ejs');
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const db = client.db('MyDB');
db.collection('myCollection').insertOne({ username: "test", password: "test" });

db.collection('myCollection').findOne({ username: "test" }).then(result => {
    console.log(result.username);
});




// Route to add a destination to the Want-to-Go List
app.post('/destination/add', (req, res) => {
  const { destination } = req.body;

  // Avoid duplicates
  if (!wantToGoList.includes(destination)) {
      wantToGoList.push(destination);
  }
  res.redirect('/wanttogo');
});

// Route to render the Want-to-Go List
app.get('/wanttogo', (req, res) => {
  res.render('wanttogo', { list: wantToGoList });
});

// GET route for destination pages
app.get('/destination/:name', async (req, res) => {
    const destinationName = req.params.name;

    const destinations = {
        santorini: {
            description: "Beautiful island in Greece.",
            video: "https://www.youtube.com/embed/UO6HZLdN-Ls"
        },
        rome: {
            description: "The capital of Italy, full of history.",
            video: "https://www.youtube.com/embed/5DcA4BePBdA"
        },
        paris: {
            description: "City of Love in France.",
            video: "https://www.youtube.com/embed/GljTvdEDqJM"
        },
        bali: {
            description: "A tropical paradise with stunning beaches and culture.",
            video: "https://www.youtube.com/embed/CBwKJfrm5-U"
        },
        annapurna: {
            description: "A scenic city in Nepal.",
            video: "https://www.youtube.com/embed/y9sJIOetf4g"
        },
        inca: {
            description: "Discover the ancient city.",
            video: "https://www.youtube.com/embed/N50PhJ4Pr1Q"
        }
    };

    if (destinations[destinationName]) {
        res.render('destination', {
            name: destinationName,
            description: destinations[destinationName].description,
            videoLink: destinations[destinationName].video
        });
    } else {
        res.status(404).send("Destination not found");
    }
});

// POST route to add a destination to "Want-to-Go List"
app.post('/destination/add', async (req, res) => {
  const { destination } = req.body;

  try {
    // Check if the destination already exists in the user's list
    const existing = await usersCollection.findOne({
      username: currentUser.username, 
      wantToGoList: destination
    });

    if (existing) {
      res.send("Destination already in your Want-to-Go List!");
    } else {
      // Add destination to the user's list
      await usersCollection.updateOne(
        { username: currentUser.username },
        { $push: { wantToGoList: destination } },
        { upsert: true }
      );
      res.send("Destination added successfully!");
    }
  } catch (err) {
    res.status(500).send("Error adding to the Want-to-Go List.");
  }
});


const destinations = {
  santorini: { 
    description: "Beautiful island in Greece.", 
    video: "https://www.youtube.com/embed/UO6HZLdN-Ls" 
  },
  rome: { 
    description: "The capital of Italy, full of history.", 
    video: "https://www.youtube.com/embed/5DcA4BePBdA" 
  },
  paris: { 
    description: "City of Love in France.", 
    video: "https://www.youtube.com/embed/GljTvdEDqJM" 
  },
  bali: {
    description: "A tropical paradise with stunning beaches and culture.", 
    video: "https://www.youtube.com/embed/CBwKJfrm5-U"
  }
};

app.listen(3000);//port number 3000 for the website
//tell app server to listen for all requests from the local host on port 3000
