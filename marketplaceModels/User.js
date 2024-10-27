const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = mongoose.Schema({
    userId:{
        type: String,
        required: [true , "Please enter your userId"],
        unique: true,
    },
    name: {
        type:String,
        required: [true , "Please enter your name"],
        maxLength:[30 , "Name must be at least 30 characters"],
        minLength:[4 , "Name must have  more than 4 letters"]
    },
    email :{
        type:String,
        required: [true , "Please enter your email"],
        validate: [validator.isEmail, "Please enter a valid email"] 
    },
    password :{
        type:String,
        required: [true , "Please enter your password"],
        select: false,
    },
    type:{
        type: String,
        required: [true , "Please enter your type"],
    },
    role: {
        type:Array,
        default:[ "FullAccess"],
    },
   
   

    resetPasswordToken : String,
    resetPasswordExpire : Date,


}
)

UserSchema.pre("save",async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password , 10)
})

UserSchema.methods.getJWTToken = function() {
    return jwt.sign({id: this._id}, "fdgdfgdfgfdg", {
      expiresIn : "5d"
    }) 
}

UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await  bcrypt.compare(enteredPassword, this.password);
  }
  

  UserSchema.methods.getResetPassword = async function(enterResetPassword) {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordToken = Date.now() + 15*60*1000;
    return resetToken;

}
const getContextUserModel = (contextDatabase) => {
    return contextDatabase.model('User', UserSchema);
};

module.exports = getContextUserModel;

