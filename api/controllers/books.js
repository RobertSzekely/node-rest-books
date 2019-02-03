const Book = require('../models/book');
const mongoose = require('mongoose');

exports.books_get_all = (req, res, next) => {
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
}

exports.books_create_book = (req, res, next) => {
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
                    id: result._id,
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
}

exports.books_get_book = (req, res, next) => {
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
}

exports.books_update_book = (req, res, next) => {
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
}

exports.books_remove_book = (req, res, next) => {
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
}