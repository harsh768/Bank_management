const mongoose = require('mongoose');


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
        type : Number,
        unique : true
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

    transactions : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Transactions'
        }
    ],

    money_request : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'RequestMoney'
        }
    ]

},{
    timestamps: true
});


const User = mongoose.model('User',userSchema);
module.exports = User;