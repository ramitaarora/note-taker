const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', (req, res) => {
    console.log(req.body);
    const {title, text} = req.body;

    if (title && text) {
        const data = {
            title,
            text,
            id: uuidv4(),
        }

        readAndAppend(data, './db/db.json');
        res.json('Note added')

    } else {
        res.json('Error adding note')
    }
})

notes.delete('/:note_id', (req, res) => {
    const noteID = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== noteID);
        writeToFile('./db/db.json', result);
        res.json(`Note ${noteID} has been deleted`);
    });
});

module.exports = notes;