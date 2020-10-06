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


module.exports.withdraw = function(req,res)
{
    return res.render('withdraw',{
        title : "Withdraw money"
    })
}

module.exports.withdraw_db = function(req,res)
{
    User.findById(req.params.id,function(err,user){
        let amount = req.body.amount;
        let final = parseInt(amount,10);
        if(user.amount >= final)
        {
            user.amount -= final;
            req.flash('success' , 'Money Withdrawed');
            user.save();
            return res.redirect('/user/profile');
        }

        else {
            req.flash('error' , 'Not enough balance');
            // req.flash('error' , 'Current Balance',user.amount);
            return res.redirect('/user/money/withdraw');
        }
    })
}

module.exports.transfer = function(req,res)
{
    return res.render('transfer',{
        title : "Transfer money"
    })
}

module.exports.transfer_db = async function(req,res)
{
        let user = await User.findById(req.params.id);
        let secondUser = await User.findOne({email : req.body.email});

        if(secondUser)
        {
            let amount = req.body.amount;
            let final = parseInt(amount,10);
            if(user.amount >= final)
            {
                user.amount -= final;
                secondUser.amount +=final;
                req.flash('success' , 'Money Transfered');
                user.save();
                secondUser.save();
            }

            else 
            {
                req.flash('error' , 'Not enough Balance');
                return res.redirect('back');
            }

        }

        else{
            req.flash('error' , 'Please Enter A valid user');
            return res.redirect('back');

        }
        return res.redirect('/user/profile');
}
