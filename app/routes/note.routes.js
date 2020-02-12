module.exports = (app) => {
    const notes = require('../controller/note.controller')

    //create a new note
    app.post('/notes', notes.create);

    //Retrive all notes
    app.get('/notes',notes.findAll);

    //Retrieve a singel note with NodeId
    app.get('/notes/noteId',notes.findOne);

    //update a note with noteId
    app.get('/notes/noteId',notes.update);

    //Delete a note with noteId    
    app.get('/notes/noteId',notes.delete);

}