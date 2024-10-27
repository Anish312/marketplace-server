const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    productId: {
        type: String,
        required: [true, "Please enter the productId"],
        unique: true, // Ensure productId is unique
        // You can also add other validation if needed
    },
    name: {
        type: String,
        required: [true, "Please enter the name"]
    },
    description: {
        type: String,
        required: [true, "Please enter the description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the price"]
    },
    category: { type: String, ref: "Category" }, // Array of category references

}); // Disable the default _id field

const getContextProductModel = (contextDatabase) => {
    return contextDatabase.model('Product', ProductSchema);
};

module.exports = getContextProductModel;
