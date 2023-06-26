const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('mydb.db');

db.serialize(() => { // Crea la tabella se non esiste
    db.run('CREATE TABLE IF NOT EXISTS mytable (name TEXT, age INTEGER, city TEXT)');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Route per la pagina principale
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route per gestire il submit del form
app.post('/submit', (req, res) => {
    const {name, age, city} = req.body;
    const stmt = db.prepare('INSERT INTO mytable VALUES (?, ?, ?)');
    stmt.run(name, age, city);
    stmt.finalize();
    res.send('Dati inseriti correttamente!');
});

app.listen( 3000, () => {
    console.log('Listening on 3000.');
});
