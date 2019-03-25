const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
// const mongoose = require('mongoose');
// const flash = require('connect-flash');
// const session = require('express-session');

const app = express();

// Passport Config
// require('./config/passport')(passport);

// DB Config
// const db = require('./config/keys').MongoURI;

// Middleware

// BodyParser Stuff
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// CORS Stuff
app.use(cors());

// Express session
// app.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
//   })
// );

// Passport.js
// app.use(passport.initialize());
// app.use(passport.session());

// Connect flash
// app.use(flash());

// Global variables
// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });

// Routes
const posts = require('./routes/api/posts');
// const login = require('./routes/api/login');

app.use('/api/posts', posts);
// app.use('/api/login', login);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
