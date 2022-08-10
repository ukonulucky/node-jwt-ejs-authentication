const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/router")
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())

// view engine
app.set('view engine', 'ejs');

// Routes 
app.use("/user", authRoutes)

const port = process.env.PORT || 7000

// database connection
const dbURI = 'mongodb+srv://Lucky490:Lucky4940@cluster0.mtmycqy.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port, () => {
   console.log("server running on port", port)
  }))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));