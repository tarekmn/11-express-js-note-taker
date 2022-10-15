const express = require('express');
const path = require('path');
const data = require('./db/db.json');
const uuid = require('./helpers/uuid');
const fs = require('fs');

const app = express();
const PORT = 3001;

//Invoking app.use() and serve static files from '/Develop'

app.use(express.static('develop'));

// Sets up the Express app to handle data parsing -MAYBE NOT NEEDED SO DOUBLE CHECK
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//Get routes for homepage and notes
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, 'public/notes.html')));

//API get route to read db.json file and return all saved notes
app.get('/api/notes', (req, res) => 
res.json(data)
);

//* `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
  
 //req. body = index.js new note variable??
 
  // const{ title, text } = req.body
  const newNote = {
    title: 'testing',
    text: '123',
    uniqueID: uuid()
  }

  const jsonNewNote = JSON.stringify(req.body);


fs.writeFile('./db/db.json', jsonNewNote, (err) =>
err ? console.error(err) : console.log(`Note has been written to JSON file`))

res.json(jsonNewNote)


})



app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
