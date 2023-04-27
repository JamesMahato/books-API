const express = require('express');
const books = require('../data/books');
const Book = require('../models/book');
const book = require('../models/book');

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
      

module.exports = router