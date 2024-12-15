
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
console.log(y);//print x in JSON format (one big string) can write this into a file
console.log(z);//print the parsed data as an object again
//console.log(x.name);//print to console

//mongoDB connection to database
const { MongoClient } = require('mongodb');
const { name } = require('ejs');
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const db = client.db('MyDB');
db.collection('myCollection').insertOne({username: "test", password: "test"});
 
//access
// db.collection('myCollection').find().toArray(function(err,results){
//   console.log(results)
// });
db.collection('myCollection').findOne({username: "test"}).then(result => {
  console.log(result.username)
  }); 

// GET route for destination pages
app.get('/destination/:name', async (req, res) => {
  const destinationName = req.params.name;

  // Example video links and descriptions for each destination
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



  // Check if destination exists
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
    console.error(err.message);
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

const availableLocations = [{ id: 1, name: "santorini" },
{ id: 2, name: "bali" },
{ id: 3, name: "paris" },
{ id: 4, name: "rome" },
{ id: 5, name: "annapurna" },
{ id: 6, name: "inca" },

];

// Lookup Route
app.post("/search", (req, res) => {
 
  const searchTerm = req.body.Search;
  console.log(searchTerm);
  try {
    // Execute a case-insensitive lookup in the availableLocations array
    const filteredLocations = availableLocations.filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.render("searchresults", {
      message: filteredLocations.length > 0 ? null : "No matching locations found",
      locations: filteredLocations,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  
});

app.listen(3000);//port number 3000 for the website
//tell app server to listen for all requests from the local host on port 3000
