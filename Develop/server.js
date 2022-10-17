const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const fs = require('fs');

// const index = require('./public/assets/js/index');

const app = express();
const PORT = process.env.PORT || 3001;

//Invoking app.use() and serve static files from '/Develop'

app.use(express.static('public'));

// Sets up the Express app to handle data parsing -MAYBE NOT NEEDED SO DOUBLE CHECK
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//Get routes for homepage and notes
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, 'public/notes.html')));

//API get route to read db.json file and return all saved notes
app.get('/api/notes', (req, res) => {
  const filePath = './db/db.json';
  const file = fs.readFileSync(filePath);
  const fileContents = file.toString();
  let jsonResponse = JSON.parse(fileContents);
  res.json(jsonResponse)
}
);

//* `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post('/api/notes', (req, res) => {
  

  const jsonNewNote = JSON.stringify(req.body);

  const filename = "./db/db.json";
  const oldFile = fs.readFileSync(filename);
  const oldData = JSON.parse(oldFile);
  const newData = [...oldData, req.body];

  fs.writeFileSync('./db/db.json', JSON.stringify(newData))

  res.json(jsonNewNote)


})



app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
