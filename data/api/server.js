/// ---- Node Dependencies ----
const express = require('express');
const helmet = require('helmet');
const knexConfig = require('../../knexfile');
const knex = require('knex');
const morgan = require('morgan');
const cors = require('cors');

/// ---- Instantiate Server ----
const server = express();

/// ---- Instantiate Database ----
const port = process.env.PORT || 7777;
const dbEngine = process.env.DB || 'development';
const notesDb = knex(knexConfig[dbEngine]);

/// ---- Connect Middleware to Server ----
server.use(express.json(), cors(), morgan('combined'), helmet());

///// ---------- CRUD Endpoints ----------

/// ---- Error Messages ----

const unableToGetNotes = { errorMessage: "Unable to retrieve notes." }
const unableToGetNote = { errorMessage: "Unable to retrieve note with the specified Id." }
const unableToCreateNote = { errorMessage: "We were unable to create an note with the specified information." }
const unableToUpdateNote = { errorMessage: "Unable to update note."}
const unableToDeleteNote = { errorMessage: "Unable to delete note."}

const unableToFindNoteWithId = { errorMessage: "Unable to find a Note with the specified Id." }
const unableToDeleteNoteWithId = { errorMessage: "Unable to delete the Note with the specified Id." }
const missingNoteData = { errorMessage: "Please provide a title and textBody when creating a note." }
const noNotesWereDeleted = { errorMessage: "No Notes were deleted" }

/// ---- Test Endpoint ----
server.get('/yourethetestaround/2819', ( request, response ) => {
    response.status(200).json("Nothings Gonna Ever Keep You Down!")
});

server.get('/', (req, res) => {
    res.send(`Api running on port: ${port}`);
  });

/// ---- Get All Notes Endpoint ----
server.get('/api/notes', (request, response) => {

    // Database Helper Promise Methods
    notesDb('notes')
    .then( notes => response.status(200).json(notes))
    .catch(() => response.status(500).json(unableToGetNotes))
});


/// ---- Get Note Endpoint ----
server.get('/api/notes/:id', (request, response) => {
    // Extract URL Parameters
    const _id = request.params.id;

    // Database Helper Promise Methods
    notesDb('notes')
    .where({ _id })
    .first()
    .then( note => response.status(200).json(note))
    .catch(() => response.status(500).json(unableToGetNotes))
});


/// ---- Create Note Endpoint ----
server.post('/api/notes', (request, response) => {
    // Deconstruct Request Body
    let { title, textBody, tags, user } = request.body;

    // Validation
    if ( !title || !textBody ) {
        return response.status(400).json(missingNoteData)
    }

    if ( !tags ) {
        tags = "";
    }

    if ( !user ) {
        user = "";
    }

    // Construct New Note Object
    const newNote = { title, textBody, tags, user };

    // Database Promise Methods
    notesDb.insert(newNote)
    .into('notes')
    .then( created => {
        if ( !created || created.length < 1 ) {
            return response.status(400).json(unableToCreateNote)
        }
        response.status(201).json(created[0]);
    })
    .catch( error => response.status(500).json(unableToCreateNote + error) );
})

/// ---- Delete Note ----
server.delete('/api/notes/:id', (request, response) => {
    // Extract URL Parameters
    const _id = request.params.id;

    if ( !_id || _id < 1 ) {
        return response.status(400).json(unableToFindNoteWithId)
    }
    
    notesDb('notes')
    .where({ _id })
    .del()
    .then( deleted => {
        if (!deleted || deleted < 1) {
            return response.json(unableToDeleteNoteWithId)
        }

        response.json(deleted)
    }

    )
    .catch(error => response.status(500).json(unableToDeleteNote))
});

server.put('/api/notes/:id', (request, response) => {

    // Extract URL Parameters
    const _id = request.params.id;

    // Deconstruct Request Body
    let { title, textBody, tags, user } = request.body;

    // Construct Updated Project Body
    let updatedNote = {};

    if ( title ) {
        updatedNote.title = title;
    }

    if ( textBody ) {
        updatedNote.textBody = textBody;
    }

    if ( tags ) {
        updatedNote.tags = tags;
    }

    if ( user ) {
        updatedNote.user = user;
    }

    console.log(updatedNote)
    // Database Helper Promise Methods
    notesDb('notes')
    .where({ _id })
    .update(updatedNote)
    .then( updated => {
        if ( !updated ) {
            return response.status(404).json(unableToFindNoteWithId)
        }
        notesDb('notes')
        .where({ _id })
        .first()
        .then( note => response.status(200).json(note))
        .catch(() => response.status(500).json(unableToGetNotes))
    })
    .catch(error => response.status(500).json(error))
});


// --- Export Server ---
module.exports = server;