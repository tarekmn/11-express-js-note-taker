const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

//Invoking app.use() and serve static files from '/Develop'

app.use(express.static('develop'));


//Get routes for homepage and notes
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, 'public/notes.html')));

//API get route to read db.json file and return all saved notes
app.get('/api/notes', (req, res) => 
res.sendFile(path.join(__dirname, './db/db.json'))


);


app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
