const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    categoryId: {
        type: String,
        required: [true, "Please enter the categoryId"],
        unique: true // Ensure categoryId is unique
    },
    name: {
        type: String,
        required: [true, "Please enter the name"]
    }
}); // Disable the default _id

const getContextCategoryModel = (contextDatabase) => {
    return contextDatabase.model('Category', CategorySchema);
};

module.exports = getContextCategoryModel;
