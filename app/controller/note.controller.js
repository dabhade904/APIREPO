const create = require('../service/note.service')

exports.create = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            //res.send({message:"Post a note"});
            message: "note cannot be empty"
        });
    }
    console.log("body.content---------->", req.body.content);
    const notes = {
        title: req.body.title || "untitled Note",
        content: req.body.content
    };
    create.create(notes,(err,data)=> {
        if(err){
            res.status(500).send({
                message:err.message || "some error has occurred"
            })
        }
        console.log("inside controller--> ", data);
        res.json(data);
    })
}


exports.findAll = (req, res) => {
    create.findAll(req, ((err, data) => {
        if (err) {
            message: "something went wrong"
        }
        res.send(data);
    }))
}

exports.findOne = (req, res) => {
    create.findOne(req.params.noteId, ((err, data) => {
        if (err) {
            message: err.message || "something went wrong"
        }
        res.send(data);
    }))
}


exports.update = (req, res) => {
    create.update(req, function (err, data) {
        if (err) {
            message: "some error ocurred"
        }
        res.send(data);
    })
}

exports.delete = (req, res) => {
    create.deleting(req.params.noteId, function (err, data) {
        if (err) {
            message: "something went wrong"
        }
        res.send(data)
    })
}