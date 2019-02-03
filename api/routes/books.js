const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require("../middleware/check-auth");

const Book = require('../models/book');

router.get('/', checkAuth, (req, res, next) => {
    Book.find()
        .select('title author _id')
        .exec()
        .then(books => {
            res.status(200).json({
                count: books.length,
                books: books
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', checkAuth, (req, res, next) => {
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
                createdBook: {
                    title: result.title,
                    author: result.author
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get("/:bookId", checkAuth, (req, res, next) => {
    const id = req.params.bookId;
    Book.findById(id)
        .select('title author _id')
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

router.patch('/:bookId', checkAuth, (req, res, next) => {
    const id = req.params.bookId
    const updateData = req.body;
    Book.updateOne({ _id: id }, updateData)
        .exec()
        .then(result => {
            res.status(201).json({
                message: 'Book updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:bookId', checkAuth, (req, res, next) => {
    const id = req.params.bookId
    Book.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Book deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;