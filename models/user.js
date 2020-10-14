const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema
({
    name : {
        type : String,
        required :  true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    phone : {
        type : Number
    },

    amount : {
        type : Number, default: 0.0
    },

    account_number : {
        type : Number, default : Math.floor((Math.random() * 100000000100) + 100000000000)
    },

    gender : {
        type : String
    },

    nationality : {
        type : String
    },

    dob : {
        type : Date
    },

    aadhar_number : {
        type : String
    },

    avatar : {
        type : String
    }

},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));  
      //joining the path of current directory to destination position
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());   
        // defining file name it will be stored as avatar . time in milli sec bcoz 
        // file . fieldname is = avatar
    }
});

//static functions

userSchema.statics.uploadedAvatar =  multer({ storage: storage }).single('avatar');  
//assigning the storage value to multer from above 
// single means only one file can be sent for fieldname avatar we can send array also but now we are sending single only

userSchema.statics.avatarPath = AVATAR_PATH;   
//made AVATAR_PATH publically accessible for controllers


const User = mongoose.model('User',userSchema);
module.exports = User;