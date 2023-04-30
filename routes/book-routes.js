const express = require('express');
const books = require('../data/books');
// const Book = require('../models/Book');
const book = require('../models/Book');

const router = express.Router()

// This makes codes organized rather then writing everthing in one file
router.route('/')
    .get(async (req, res, next) => {
        // Approch 1 (Better)(async not needed in function)
        // Book.find()
        //     .then (books => res.json(books))
        //     .catch (err => console.log(err))

        // Approch 2 
        try {
            const books = await Book.find() 
            res.json(books)
        } catch (error) {
            next;
        }   
        
    })
    .get((req, res, next) => {
        res.json(books)
        Book.find(req.body) 
            .then((book) => res.json(books))
            .catch(next)
            // .catch(err => next(err))
            // Error handling middlewear
        // try {
        //     const books = await Book.find()
        //     res.json(books)
        // } catch {
        //     console.log(err);
        // }
    })

    .post((req, res, next) => {
        // if(!req.body.title){
        //     return res.status(400).json({error: 'Title is missing'})
        // }
        // const book = {
        //     id : books.length + 1,
        //     title : req.body.title,
        //     author : req.body.author || 'Anonymous' 
        // }
        // books.push(book)
        // // res.json(book)
        // res.status(201).json(book)
        // // res.json(req.body);

        Book.create(req.body)
        .then((book) => res.status(201).json(book))
        // .catch(err => console.log(err))
        .catch(next)
    })

    .put((req, res) => {
        res.status(405).json({ error:"This method (PUT) is not allowed" })
    })

    .delete((req, res, next) => {
        book.deleteMany()
            .then(reply => res.json(reply))
            // .catch(err => console.log(err))
            .catch(next)
    })
    
router.route('/:book_id')
    .get((req, res, next) => {
        // const book = books.find((b) => b.id === parseInt(req.params.book_id));
        // if (!book) {
        //     return res.status(404).json({ error: 'Book not found' });
        // }
        // res.json(book);
        Book.findById(req.params.book_id)
        // .then((book) => res.json(book))
        .then((book) => {
                if(!book) {
                    res.status(404).json({ error: "Book not found" }) 
                }
                res.json(book)
            })
        // .catch(err => console.log(err))
        .catch(next)

    })

    .post((req, res) => {
        res.status(405).json({error: 'This method (POST) is not allowed'})
    })

    .put((req, res, next) => {
        // const updated_books = books.map((b) => {
        // if(b.id == req.params.book_id){
        //     b.title = req.body.title
        //     b.author = req.body.author
        // }
        //     return b
        // })
        // res.json(updated_books)
        Book.findByIdAndUpdate(
            req.params.book_id,
            { $set : req.body },
            { new : true}
        )
        .then(updated => res.json(updated))
        // .catch(err => console.log(err))
        .catch(next)
    })

    .delete((req, res, next) => {
        // const index = books.findIndex((b) => b.id === parseInt(req.params.book_id));
        // if (index === -1) {
        //   return res.status(404).json({ error: 'Book not found' });
        // }
        // books.splice(index, 1);
        // res.json(books);
        Book.findOneAndDelete(req.params.book_id)
            .then(reply => res.status(204).end())
            // .catch(err => console.log(err))
            .catch(next)
    });

router.route('/:book_id/reviews')

    .get((req, res, next) => {
        Book.findById(req.params.book_id)
        .then((book) => {
            if (!book) 
                return res.status(404).json({ error: 'book not found' })
                res.json(book.review)
        }).catch(next)
    })

    .post((req, res, next) => {
        Book.findById(req.params.book_id)
            .then((book) => {
                if(!book)
                    return res.status(404).json({ error : 'book not found'})
                const review = {
                    text: req.body.test
                }
                books.reviews.push(review)
                book.save()
                    .then((book) => res.status(201).json(book.reviews[book.reviews.length - 1]))
                    .catch(next)
            }).catch(next)
    })

    .put((req, res, next) => {
        res.status(405).json({error: 'This method (PUT) is not allowed'})
        .catch(next)
    })

    .delete((req, res, nect) => {
        Book.findById(req,params.book_id)
        .then((book) => {
            if (!book) 
                return res.status(404).json({ error : 'book not found' })
                book.reviews = []
                book.save()
                    .then((book) => res.status(204).end())
                    .catch(next)
        }).catch(next)
    })
      
router.route('/:book_id/reviews/:review_id')

    .get((req, res, next) => {
        Book.findById(req.params.book_id)
        .then(book => {
            if (!book) 
                return res.status(404).json({ error: 'book not found' })
                const review = book.reviews.id(req.params.book_id)
                if(!review)
                    return res.status(404).json({ error : "reviews not found"})
                res.json(review)
        }).catch(next)
    })

    .put((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                if (!book)
                    return res.status(404).json({ error : 'book not found '})
                    // to find use map
                book.reviews = book.reviews.map((r) => {
                    if(r._id === req.params.review_id) {
                        r.text = req.body.text
                    }
                    return r
                })
                book.save()
                    .then(book => {
                        res.json(book.reviews.id(req.params.review_id))
                    })
                    .catch(next)
            }).catch(next)
        })

    .post((req, res, next) => {
        res.status(405).json({error: 'This method (POST) is not allowed'})
    })

    .delete((req, res, next) => {
        Book.findById(req.params.book_id)
        .then(book => {
            if(!book)
                return res.status(404).json({ error: "book not found "})
                // to delete use filter
                book.reviews = book.reviews.filter((r) => {
                    return r._id !== req.params.review_id
                })
                book.save()
                    .then(book => res.status(204).end())
                    .catch(next)
        }).catch(next)
    })

module.exports = router