const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('../APIRepo/database.config.js');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("successfully contected to database");
}).catch(err => {
    console.log('could not connect to the database . Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    let message = "welcome to easyNode appliction, " +
        "take notes quickly.organize and keep track of all you"
    res.json({ "message": message });
});

require('../APIRepo/app/routes/note.routes')(app)

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});