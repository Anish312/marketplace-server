const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const sendEmail = require('../utils/sendEmail')
const crypto = require("crypto");
const mpSendToken = require('../utils/mpJwtToken');
// const User = require('../marketplaceModels/User');
const getContextUserModel = require('../marketplaceModels/User');
const getContextDatabase = require('../utils/contextDatabaseContext');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { userId, name, email, password, role, type } = req.body;
    const identifier = "identifier";
    const contextDatabase = getContextDatabase(identifier);
    if (!contextDatabase) {
        return res.status(500).json({
            success: false,
            message: "Could not connect to context-specific database"
        });
    }
    const User = getContextUserModel(contextDatabase);
    const user = await User.create({
        userId, name, email, password, role, type

    })
    mpSendToken(user, 201, res, false)
});
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const identifier = "identifier";
    const contextDatabase = getContextDatabase(identifier);
    if (!contextDatabase) {
        return res.status(500).json({
            success: false,
            message: "Could not connect to context-specific database"
        });
    }
    const User = getContextUserModel(contextDatabase);
    const users = await User.find().select("+password");;

    res.status(200).json({
        success: true,
        users
    });
});

exports.registerAnonymousUser = catchAsyncErrors(async (req, res, next) => {

    const [userId, name, email, password, role, type] = ["anon1", "annon", "anon@gmail.com", "password", "FullAccess", "buyer"];
    const identifier = "identifier";
    const contextDatabase = getContextDatabase(identifier);
    if (!contextDatabase) {
        return res.status(500).json({
            success: false,
            message: "Could not connect to context-specific database"
        });
    }
    const User = getContextUserModel(contextDatabase);

    const user = await User.create({
        userId, name, email, password, role, type

    })
    mpSendToken(user, 201, res, true)
});
exports.loginAnonymousUser = catchAsyncErrors(async (req, res, next) => {

    const [email, password] = ["anon@gmail.com", "password"];

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password"));
    }
    const identifier = "identifier";
    const contextDatabase = getContextDatabase(identifier);
    if (!contextDatabase) {
        return res.status(500).json({
            success: false,
            message: "Could not connect to context-specific database"
        });
    }
    const User = getContextUserModel(contextDatabase);
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email and password"));

    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email and password", 401));

    }
    mpSendToken(user, 200, res, true)
})


exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password"));
    }
    const identifier = "identifier";
    const contextDatabase = getContextDatabase(identifier);
    if (!contextDatabase) {
        return res.status(500).json({
            success: false,
            message: "Could not connect to context-specific database"
        });
    }
    const User = getContextUserModel(contextDatabase);
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email and password"));

    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email and password", 401));

    }
    mpSendToken(user, 200, res, false)
})

exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expire: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "logged out"
    })
})
