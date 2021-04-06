const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const {check, validationResult} = require('express-validator');


// All are private routes
router.get('/', auth, async(req, res) => {
   
    const {id} = req.user;
    try {
        const contact = await Contact.find({user: id});
        return res.status(200).json(contact);
    }catch(err) {
        console.error(err.message);
        return res.status(500).json('Server Error');
    }
   
});

router.post('/', [auth,
check('name','name is required').not().isEmpty(),
check('phone', 'phone number is required').isNumeric()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, phone, type, date} = req.body; 
    const {id} = req.user;

    try {
        let contact = new Contact({
            user: id,
            name,
            email,
            phone,
            type
        });
    
        await contact.save();
        return res.status(201).json(contact);
    }catch(err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }

});

router.put('/:id', auth, async(req, res) => {

    const {name, phone, email, type} = req.body;

    const updatedContact = {};

    if(name) updatedContact.name = name;
    if(phone) updatedContact.phone = phone;
    if(email) updatedContact.email = email;
    if(type) updatedContact.type = type;
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg: 'Contact not found'});

        contact = await Contact.findByIdAndUpdate(req.params.id, {set: updatedContact}, {new: true});

        return res.status(200).json(contact);   
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});

router.delete('/:id', async(req, res) => {
   try {
    let deleteContact = await Contact.findById(req.params.id);  
    if(!deleteContact){
        return res.status(404).json({msg: 'Contact not found'});
    }
    await Contact.findByIdAndRemove(req.params.id);
    return res.json({msg: 'Contact removed'});
   }catch(err) {
       console.error(err.message);
       return res.status(500).send('Server Error');
   }
    
});

module.exports = router;
