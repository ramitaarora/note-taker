const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
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

module.exports = notes;