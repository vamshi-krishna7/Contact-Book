const express = require('express');
const router = express.Router();  // middleware
const {check, validationResult} = require('express-validator');
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middleware/auth');


// get logged in user
router.get('/', auth, async(req, res) => {
    let {id} = req.user;      
    try {
        let user = await User.findById(id).select('-password'); // === findOne({_id: id})
        return res.status(200).json(user)
    }catch(err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error'});
    }

})

// login user
router.post('/', 
[
    check('email', 'Enter a valid email').not().isEmpty(),
    check('password', 'Enter a password with minimum 6 characters in length').isLength({min: 6})
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body;

    

    try{
        let user = await User.findOne({email}); // === findOne({email: email})
        if(!user) {
        return res.status(401).json({msg: 'Invalid Credentials'})
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
        return res.status(401).json({msg: 'Invalid Credentials'})
        }

        const payload = {
        user: {
            id: user.id
        }
        }

        jwt.sign(payload, process.env.jwtSecret, {
        expiresIn: 360000
        }, (err, token) => {
        if(err) throw err
        return res.status(200).json({token})
        })
    }catch(err) {
        return res.status(500).json('Server Error')
    }
})

module.exports = router;