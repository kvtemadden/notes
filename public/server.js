// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");
const { stringify } = require("querystring");
var count = 0;

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '../db/db.json')));
app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, './assets/js/index.js')));
app.get('/assets/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, './assets/css/styles.css')));

app.post('/api/notes', (req, res) => {
    count++;
    const newNote = req.body;
    console.log(newNote);

    // const addNewNote = JSON.stringify(newNote, null, 2);
    // We then add the json the user sent to the character array
    // appendToFile(addNewNote);
  
    var db = require("../db/db.json");

    db.push(newNote);
    console.log(db);
    const writeFile = JSON.stringify(db, null, 2);
    generateNotes(writeFile);
    // We then display the JSON to the users
    // res.json(newNote);
});

function generateNotes(notes) {
    fs.writeFile("../db/db.json", notes, (err) =>
    err ? console.error(err) : console.log('New note added successfully!'));
}

//Console logs active port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));


