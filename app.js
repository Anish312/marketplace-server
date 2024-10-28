const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');
app.use(express.json());
const bodyParser = require("body-parser");
const session = require('express-session');
const product = require('./marketplaceRoutes/productRoutes')
const user2 = require('./marketplaceRoutes/userRoutes')
app.use(cookieParser());
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // Allow credentials (cookies)
  }));
const user = require('./routes/userRoutes');
const marketplace = require('./routes/marketplaceRoutes');

app.use(session({
  secret: 'fdgdfgdfgfdg',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,  
    sameSite: 'lax' 
  }
}));
app.use("/api/v1/", user); 
app.use("/api/v1/", marketplace); 
app.use("/mp/" , user2)

app.use("/mp/" , product)
app.use(errorMiddleware) 
module.exports = app