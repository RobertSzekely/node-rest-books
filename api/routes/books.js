const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /books'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /books'
    });
});

router.get('/:bookId', (req, res, next) => {
    const id = req.params.bookId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
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