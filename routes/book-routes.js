const express = require('express');
// const books = require('../data/books');
const bookController = require('../controllers/book_controller')
const reviewController = require('../controllers/review_controller')

const router = express.Router()

// This makes codes organized rather then writing everthing in one file
router.route('/')
    // .get(async (req, res, next) => {
    //     // Approch 1 (Better)(async not needed in function)
    //     // Book.find()
    //     //     .then (books => res.json(books))
    //     //     .catch (err => console.log(err))

    //     // Approch 2 
    //     // try {
    //     //     const books = await book.find() 
    //     //     res.json(books)
    //     // } catch (error) {
    //     //     next;
    //     // }   
        
    // })
    .get(
        // res.json(books)
        // book.find(req.body) 
        //     .then((book) => res.json(books))
        //     .catch(next)
        //     // .catch(err => next(err))
        //     // Error handling middlewear
        // // try {
        // //     const books = await Book.find()
        // //     res.json(books)
        // // } catch {
        // //     console.log(err);
        // // }
        bookController.getAllbooks
    )

    .post(
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

        // book.create(req.body)
        // .then((book) => res.status(201).json(book))
        // // .catch(err => console.log(err))
        // .catch(next)

        bookController.createbook
    )

    .put((req, res) => {
        res.status(405).json({ error:"This method (PUT) is not allowed" })
    })

    .delete(
        // book.deleteMany()
        //     .then(reply => res.json(reply))
        //     // .catch(err => console.log(err))
        //     .catch(next)
        bookController.deleteAllbooks
    )
    
router.route('/:book_id')
    .get(
        // const book = books.find((b) => b.id === parseInt(req.params.book_id));
        // if (!book) {
        //     return res.status(404).json({ error: 'Book not found' });
        // }
        // res.json(book);
        // book.findById(req.params.book_id)
        // // .then((book) => res.json(book))
        // .then((book) => {
        //         if(!book) {
        //             res.status(404).json({ error: "Book not found" }) 
        //         }
        //         res.json(book)
        //     })
        // // .catch(err => console.log(err))
        // .catch(next)
        bookController.getAbook
    )

    .post((req, res) => {
        res.status(405).json({error: 'This method (POST) is not allowed'})
    })

    .put(
        // const updated_books = books.map((b) => {
        // if(b.id == req.params.book_id){
        //     b.title = req.body.title
        //     b.author = req.body.author
        // }
        //     return b
        // })
        // res.json(updated_books)
        // book.findByIdAndUpdate(
        //     req.params.book_id,
        //     { $set : req.body },
        //     { new : true}
        // )
        // .then(updated => res.json(updated))
        // // .catch(err => console.log(err))
        // .catch(next)
        bookController.updateAbook
    )

    .delete(
        // const index = books.findIndex((b) => b.id === parseInt(req.params.book_id));
        // if (index === -1) {
        //   return res.status(404).json({ error: 'Book not found' });
        // }
        // books.splice(index, 1);
        // res.json(books);
        // book.findOneAndDelete(req.params.book_id)
        //     .then(reply => res.status(204).end())
        //     // .catch(err => console.log(err))
        //     .catch(next)
        bookController.deleteAbook
    );

router.route('/:book_id/reviews')

    .get(
        reviewController.getAllReviews
    )

    .post(
        reviewController.createReview
    )

    .put((req, res, next) => {
        res.status(405).json({error: 'This method (PUT) is not allowed'})
        .catch(next)
    })

    .delete(
        reviewController.deleteReviews
    )
      
router.route('/:book_id/reviews/:review_id')

    .get(
        reviewController.createReview
    )

    .put(
        reviewController.deleteAreview    
    )

    .post((req, res, next) => {
        res.status(405).json({error: 'This method (POST) is not allowed'})
    })

    .delete(
        reviewController.deleteAreview
    )

module.exports = router