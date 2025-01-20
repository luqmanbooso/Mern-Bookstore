import express from "express";
import { User, validate } from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).send("User already registered.");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashedPassword }).save();
    res.status(201).send("User created successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Route for get all books from db
router.get("/", async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get user by id from db
router.get('/:id', async (request,response) => {
  try {
      const {id} = request.params;

      const user = await User.findById(id);

      return response.status(200).json(user);
  } catch (error) {
      console.log(error.message);
      response.status(500).send({message:error.message})
  }
});

// update user
router.put('/:id',async (request,response) => {
    try {
        if (
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.email ||
            !request.body.password
        ) {
            return response.status({
                message:'Send all required fields: title,author,publishYear',
            });
        } 

        const {id} = request.params;

        const result = await User.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(400).json({message:"Book not found"});
        }

        return response.status(200).json({message:"User updated successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message })
    }
} );

//Route for delete a book
router.delete('/:id',async (request,response) => {
    try {
        const {id} = request.params;

        const result = await User.findByIdAndDelete(id, request.body);

        if(!result){
            return response.status(400).json({message:"Usert found"});
        }

        return response.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message })
    }
} );
export default router;
