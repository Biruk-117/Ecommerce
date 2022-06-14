import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js'
import data from '../data.js'
import { generateToken } from '../utils.js';

const userRouter = express.Router();

//Gives us all users
userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await User.remove({}); //helps us to add multiple users, to make duplication not possible

    const createdUsers = await User.insertMany(data.users);

    res.send({ createdUsers });

})
);



userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email } /*, (err, user) => {
        if (err) {
            res.status(500).send(err)
        } else {
            console.log("user : " + user);
        }
    }*/  );

    if (user) {
        if ( bcrypt.compareSync(req.body.password, user.password) ) {
            
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send( { message: 'Invalid email or password' } );

}))


export default userRouter;