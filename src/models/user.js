const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 4,
        maxLength : 100,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 4,
        maxLength : 100,
    },
    userName: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 4,
        maxLength : 100,
    },
    empCode: {
        type: String,
        required: true,
        minLength: 4,
        maxLength : 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid!!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength : 20,
        validate(value){
            if(!validator.isStrongPassword(value)) {
                throw new Error("Passing is not strong!!");
            }
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error("Mobile number not valid!!");
            }
        }
    },
    roleTag: {
        type: String,
        required: true,
        minLength: 4,
        maxLength : 100,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false,
    },
    branchId: {
        type: String,
        required: true,
        minLength:1,
        maxLength: 4,
    },
    branchName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,

    },
    userType: {
        type: String,
        required: true,
        enum: {
            values: ["maker", "checker", "admin", "mis"]
        }

    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
    },
    isAdmin: {
        type: Boolean
    }
}, {timestamps: true})

userSchema.methods.validatePassword = async function(password){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    return isPasswordValid
}

const User = mongoose.model("User", userSchema);
module.exports = User;