const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config({path: './config/config.env'});


const app = express();

connectDB();

app.use(express.json({ extended: false}));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));