const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '1599',
    database : 'smartbrain'
  }
});

// db.select('*'). from('users').then(data => {
//   console.log(data);
// });

const app = express();



app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res)=> {
    res.send("It is working");
  })

  app.post('/signin', signin.handleSignin( db, bcrypt) )
    // Load hash from your password DB.
// bcrypt.compare("bookess", '$2a$10$w.Wi4TbPLoRk0oS4AYhRGeV/PqMhghZ7.fMNlIFWSPDSZytnWU38W', function(err, res) {
//   console.log('first guest', res)
// });
// bcrypt.compare("veggies", '$2a$10$w.Wi4TbPLoRk0oS4AYhRGeV/PqMhghZ7.fMNlIFWSPDSZytnWU38W', function(err, res) {
//   console.log('second guest', res)
// });
//     if (req.body.email === database.users[0].email &&
//         req.body.password === database.users[0].password) {
//           res.json('success');
//         } else {
//           res.status(400).json('error logging in');
//         }
  

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id',(req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res,) })

// bcrypt.hash("bacon", null, null, function(err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`)
})





// -->  res = this is working
// signin  --> POST  success/fail
// register --> POST = user
// profile/:userId --> GET = user
// image --> PUT --> user