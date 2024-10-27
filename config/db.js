const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorHandler');
const connectDb = async()=> {
    try {

        await mongoose.connect('mongodb+srv://anishgehlot25:admin@cluster0.rrkrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
        console.log('Database connection established')
    }
    catch (err) {
       throw new ErrorHandler("Unable to establish connection with database" , 500);
    }
}

module.exports = connectDb