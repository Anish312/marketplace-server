const OwnerUser = require("../models/User");
const User = require("../marketplaceModels/User")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const getContextDatabase = require("../utils/contextDatabaseContext");
const getContextUserModel = require("../marketplaceModels/User");

exports.isAuthenticatedOwner = catchAsyncErrors(async (req, res, next) => {
    const {ownerToken} = req.cookies;

    if(!ownerToken) {
        return next(new ErrorHandler("please login first" ,401))
    }
    const decodedData =jwt.verify(ownerToken ,"fdgdfgdfgfdg" )

     req.user =  await OwnerUser.findById(decodedData.id)

     next();
})

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token } = req.cookies;
    const identifier = "identifier";
    const contextDatabase = getContextDatabase(identifier);
    if (!contextDatabase) {
        return res.status(500).json({
            success: false,
            message: "Could not connect to context-specific database"
        });
    }
    const User = getContextUserModel(contextDatabase);
    if(!token ) {
        return next(new ErrorHandler("please login first" ,401))
    }
    const decodedData =jwt.verify(token ,"fdgdfgdfgfdg" )
     req.user =  await User.findById(decodedData.id)
     console.log(req.user)
     next();
})
exports.authorizeUserType = (...types) => {
    return (req, res, next) => {
      // Check if req.user is available
      if (!req.user) {
        return next(new ErrorHandler("User information not found", 401));
      }
  console.log("d",types.includes(req.user.type))
      // Check if the user's type is included in the allowed types
      if (!types.includes(req.user.type)) {
        return next(new ErrorHandler(`Role: ${req.user.type} is not allowed to perform this action`, 403));
      }
  
      // If the type is allowed, proceed to the next middleware
      next();
    };
  };
  

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => { 
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
        }
        next();
    }
}