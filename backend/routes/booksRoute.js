import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route for save a new book

router.post('/', async (request,response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishedYear 
        ) {
            return response.status({
                message:'Send all required fields: title,author,publishYear',
            });
        } 

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishedYear: request.body.publishedYear,

        };
        //Book-model name in BookModel
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

//Route for get all books from db
router.get('/', async (request,response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
});

//Route for get book by id from db
router.get('/:id', async (request,response) => {
    try {
        const {id} = request.params;

        const books = await Book.findById(id);

        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
});

//update book
router.put('/:id',async (request,response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishedYear 
        ) {
            return response.status({
                message:'Send all required fields: title,author,publishYear',
            });
        } 

        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(400).json({message:"Book not found"});
        }

        return response.status(200).json({message:"Book updated successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message })
    }
} );

//Route for delete a book
router.delete('/:id',async (request,response) => {
    try {
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id, request.body);

        if(!result){
            return response.status(400).json({message:"Book not found"});
        }

        return response.status(200).json({message:"Book deleted successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message })
    }
} );

export default router;