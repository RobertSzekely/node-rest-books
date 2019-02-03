const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Book = require('../models/book');

router.get('/', (req, res, next) => {
    Book.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author
    });
    book
        .save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Handling POST requests to /books',
                createdBook: book
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get("/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    Book.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry found for provided id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
});

router.patch('/:bookId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated book'
    })
});

router.delete('/:bookId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted book'
    })
});

module.exports = router;