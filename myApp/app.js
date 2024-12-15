var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express(); // Initiation of the express server

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

// Go to homepage after logging in after registering
app.post('/login', function (req, res) {
    res.render('home');
});

// JSON File Operations
var x = { name: "Ali", age: 27, username: "ali92", password: "abc123" };
var y = JSON.stringify(x);
fs.writeFileSync("users.json", y);

var data = fs.readFileSync("users.json");
var z = JSON.parse(data);
console.log(x);
console.log(y);
console.log(z);

// MongoDB Connection
const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const db = client.db('MyDB');
db.collection('myCollection').insertOne({ username: "test", password: "test" });

db.collection('myCollection').findOne({ username: "test" }).then(result => {
    console.log(result.username);
});

// In-memory Want-to-Go List
let wantToGoList = [];

// Route to add a destination to the Want-to-Go List
app.post('/destination/add', (req, res) => {
    const { destination } = req.body;

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

// City-specific pages
app.get('/bali', function (req, res) {
    res.render('bali');
});
app.get('/santorini', function (req, res) {
    res.render('santorini');
});
app.get('/paris', function (req, res) {
    res.render('paris');
});
app.get('/rome', function (req, res) {
    res.render('rome');
});
app.get('/annapurna', function (req, res) {
    res.render('annapurna');
});
app.get('/inca', function (req, res) {
    res.render('inca');
});

// Search functionality
app.post('/search', function (req, res) {
    res.render('searchresults');
});

// Start the server
app.listen(3000); // Port number 3000 for the website
