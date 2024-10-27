const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
const connectDb = require('./config/db')
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bodyParser = require("body-parser");

const port = process.argv[2]; // Get the port from the passed argument
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb()
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Allow credentials (cookies)
}));
const product = require('./marketplaceRoutes/productRoutes')
const user = require('./marketplaceRoutes/userRoutes')
const category = require('./marketplaceRoutes/categoryRoutes')

const session = require('express-session');
app.use(session({
  secret: 'fdgdfgdfgfdg',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // Helps prevent cross-site scripting (XSS)
    secure: true,  // Set to true if using HTTPS
  }
}));


app.use("/mp/" , user)

app.use("/mp/" , product)
app.use("/mp/" , category)

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Marketplace server running on port ${port}`);
});

