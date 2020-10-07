const mongoose = require('mongoose');


const transactionsSchema = new mongoose.Schema
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

    deposit : {
        type : Boolean
    }

},{
    timestamps: true
});


const Transactions = mongoose.model('Transactions',transactionsSchema);
module.exports = Transactions;