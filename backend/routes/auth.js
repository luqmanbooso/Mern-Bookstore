import express from 'express';
import { User } from '../models/user.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
console.log('JWT Secret:', process.env.JWTPRIVATEKEY);

// Create the router instance
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message); 

        const user =await User.findOne({email: req.body.email});
        if(!user) return res.status(401).send("Invalid email ");

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword) return res.status(401).send("Invalid password");  
         // Make sure the secret key exists
         const secretKey = process.env.JWTPRIVATEKEY;
         if (!secretKey) {
             throw new Error('FATAL ERROR: JWTPRIMARYKEY is not defined.');
         }
        const token = user.generateAuthToken();
        res.status(200).send({data:token,message:"Login successful"});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

const validate = (data) => {

    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
}

export default router;