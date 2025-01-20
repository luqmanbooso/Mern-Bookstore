import express, { request, response } from 'express';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/auth.js';



// import bodyParser fr om 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;
const mongodbURL = 'mongodb+srv://luqmanbooso:1234@bookey.gvbx3.mongodb.net/?retryWrites=true&w=majority&appName=bookey'

// Middleware
app.use(cors());

app.use(express.json());

//login routes
app.use('/login', authRoute); 
app.use('/signup', userRoute);

// MongoDB connection
mongoose.connect(mongodbURL)
        .then(() => {
            console.log('App connected to database');
        })
        .catch((error) => {
            console.log(error);
        });

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('MongoDB database connection established successfully');
// });

// Routes
//Route to default
app.get('/', (request,response) => {
    response.send('Welcome to the MERN Bookstore API');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.use('/books', booksRoute);