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
    },

    balance : {
        type : Number
    },

    balance_of_receiver : {
        type : Number
    },
    
    lastActiveAt : Date


},{
    timestamps: true
});

transactionsSchema.lastActiveAt instanceof Date;

const Transactions = mongoose.model('Transactions',transactionsSchema);
module.exports = Transactions;