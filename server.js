const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/todos", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const TodoSchema = new mongoose.Schema({
    name: String
});

const Todo = mongoose.model("Todo", TodoSchema);

app.get('/', (req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

app.post('/', (req, res) => {
    const newTodo = new Todo({
        name: req.body.name
    });
    newTodo.save()
        .then(todo => {
            res.status(200).json(todo);
        }).catch(err => {
            res.status(400).send(err);
        });
});

app.delete('/:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => todo.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));

});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});