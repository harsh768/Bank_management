const User = require('../models/user');

module.exports.deposit = function(req,res)
{
    return res.render('deposit',{
        title : "Deposit money"
    })
}

module.exports.deposit_db = function(req,res)
{
    User.findById(req.params.id,function(err,user){
        let amount = req.body.amount;
        let final = parseInt(amount,10);
        user.amount += final;
        user.save();
        req.flash('success' , 'Money Deposited');
        return res.redirect('/user/profile');
    })
}