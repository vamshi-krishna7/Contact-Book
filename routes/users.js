const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

// public access,  register a user
router.post('/', 
[
    check('name', 'please include your name').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'please enter a password with atleast 6 characters in length').isLength({min: 6})
    
], async(req, res) => {
    const errors = validationResult(req);     // validationResult = result after checking
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        
        if(user) {
            return res.status(400).json({msg :'user already exists'});
        }

        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.jwtSecret, {
            expiresIn: 360000
        }, (err, token) => {
            if(err){
                throw err;
            }else {
                res.json({token})
            }
        });

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;