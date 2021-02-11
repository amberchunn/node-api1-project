// BUILD YOUR SERVER HERE
const express = require('express');
const cors = require('cors');
const server = express();
const db = require('./users/model');


// Middleware
server.use(express.json())
server.use(cors());

/** Create Endpoints **/

const root = '/api';

// Read
server.get(`${root}/`, (req, res) => {
    res.status(200).json({"message": "Success!"});
})

// Get all users
server.get(`${root}/users/`, (req, res) => {
    db.find().then(users => {
    res.status(200).json(users);
    }).catch(error => {
        res.status(500).json({ message: "The users information could not be retrieved" });
    });
})

// Get specific user
server.get(`${root}/users/:id`, (req, res) => {
    const user = req.params.id;
    if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
    } else {
        db.findById(user).then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(500).json({ message: "The user information could not be retrieved" });
        })
    }
})

// Create new user
server.post(`${root}/users/`, (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;
    if (!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
    db.insert({name, bio})
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(error  => {
            res.status(500).json({ message: "There was an error while saving the user to the database" });
        });
    }
})

// Update
server.put(`${root}/users/:id`, (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;
    const id = req.params.id;
    const changes = {name, bio};

    if (!id) {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
    } else if (!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
    } else {
        db.update(id, changes)
        .then(updatedUser => {
            res.status(200).json(updatedUser);
        })
        .catch(error  => {
            res.status(500).json({ message: "The user information could not be modified" });
        });
    }
});

// Delete specific user
server.delete(`${root}/users/:id`, (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else {
    db.remove(id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error  => {
            res.status(500).json({ message: "The user could not be removed" });
        });
    }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
