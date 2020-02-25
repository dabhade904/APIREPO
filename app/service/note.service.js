const Note = require('../models/note.model')

module.exports = {

    create(note, callback) {
        console.log("body.content---------->", note);

        const objNotes = new Note()
        objNotes.title = note.title;
        objNotes.content = note.content;
        console.log('objNotes model obj------->', objNotes);

        objNotes.save().then(data => {
            console.log('after saved------>', data);

            return callback(null,data);
        }).catch(err => {
            return callback({ message: "something went wrong" })
        })
    },


    findAll(data, callback) {
        console.log("content inside body------------>", data.content);
        console.log('objNotes model obj--------------->', data);
        Note.find().then(data => {
            return callback(null, data)
        }).catch(err => {
            return callback({ message: err.message || "Some Error Occurred while retrieving notes" })
        });
    },

    findOne(data, callback) {
        console.log(data);
        Note.findById(data).
            then(data => {
                console.log("note data--> ", data)
                return callback(null, data)
            }).catch(err => {
                return callback({ message: "Error retrieving with node Id" })
            })
    },

    update(data, callback) {
        Note.updateOne({ "id": data.params.noteId }, { $set: { 'title': data.body.title } }).
            then(note => {
                return callback(null, note);
            }).catch(err => {
                return callback({ message: "Error occurred while updating" })
            })
    },

    deleting(data, callback) {
        console.log('data in services------------>', data);
        Note.findOneAndDelete(data).
            then(note => {
                return callback(null, note);
            }).catch(er => {
                return callback({ message: "Error occurred while deleting" })
            })
    }
}