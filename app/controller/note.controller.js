const Note = require('../models/note.model');

exports.create = (req, res) => {
    // res.send({message:"Post a notes"})
    if (req.body.content) {
        return res.status(400).send({
            message: "Note cannot empty"
        });
    }
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });
    note.save().
        then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || " Some Error Occurred while creating"
            });
        });
        exports.findAll=(req,res)=>{
            Note.find()
            .then(note =>{
                res.send(note);
            }).catch(err => {
                res.status(500).send({
                    message:err.message || "Some Error While Creating"
                })
            })
        }

    exports.findOne = (req, res) => {
        Note.findById(req.params.noteId).
            then(note => {
                if (!note) {
                    res.status(404).send({
                        message: "Note not found with id" + req.parsrams.noteId
                    });
                }
                res.send(note);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Note not found with id :" + req.params.noteId
                    });
                }
                return res.status(500).send({
                    message: "Error while receiving note with id " + req.params.noteId
                });
            });
    };

};