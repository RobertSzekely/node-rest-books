const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Book = require('../models/book');

router.get('/', (req, res, next) => {
    Book.find()
        .exec()
        .then(books => {
            console.log(books);
            if (books.length >= 0) {
                res.status(200).json(books);
            } else {
                res.status(404).json({
                    message: 'No entries found'
                })
            }
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
                message: 'Book was added successfully',
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
        .then(book => {
            console.log(book);
            if (book) {
                res.status(200).json(book);
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
    const id = req.params.bookId
    const updateData = req.body;
    Book.update({ _id: id }, updateData)
    .exec()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:bookId', (req, res, next) => {
    const id = req.params.bookId
    Book.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;