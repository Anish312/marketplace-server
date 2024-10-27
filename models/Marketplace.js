const mongoose = require('mongoose')
const validator = require("validator")

const marketplaceSchema = mongoose.Schema({
    marketplaceName: {
        type:String,
        required: [true , "Please enter your name"],
        minLength:[4 , "Name must have  more than 4 letters"]
    },
    identifier :{
        type:String,
        required: [true , "Please enter your indentifer"],
      // unique: true,
    },
    enviroment :{
        type:String,
        required: [true , "Please enter your enviroment"],

    },
    owner: {
        type:String,
        required: [true , "Please enter your owner"],
    },
    ownerEmail :{
        type:String,
        required: [true , "Please enter your email"],
    //    unique: true,
    },
    contextDatabaseName:{
        type:String,
        required: [true , "Please enter your contextDatabaseName"],
    //    unique: true,
    },

}
)
module.exports = mongoose.model("Marketplace" , marketplaceSchema);