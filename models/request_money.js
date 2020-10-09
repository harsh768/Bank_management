const mongoose = require('mongoose');

const requestmoneyschema = new mongoose.Schema
({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User' 
    },

    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User' 
    },

    amount : {
        type : Number
    },

    completed : {
        type : Boolean
    }

},{
    timestamps: true
});


const RequestMoney = mongoose.model('RequestMoney',requestmoneyschema);
module.exports = RequestMoney;