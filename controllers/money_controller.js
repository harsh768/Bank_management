const User = require('../models/user');
const Transactions = require('../models/transactions');
const RequestMoney = require('../models/request_money');

module.exports.deposit = async function(req,res)
{
    let requests = await RequestMoney.find({$or: [
        {
            sender: req.user.id
        },{
            receiver: req.user.id
        }
    ]}).sort('-createdAt').populate('sender').populate('receiver');

    return res.render('personal_banking_views/deposit',{
        title : "Deposit money",
        all_requests : requests
    })
}

module.exports.deposit_db = async function(req,res)
{
    let user = await User.findById(req.params.id);
    if(user)
    {
        let amount = req.body.amount;
        let final = parseInt(amount,10);
        user.amount += final;

        let transaction = await Transactions.create
        ({
            sender : user.id,
            receiver : user.id,
            amount : final,
            deposit : true
        });

        console.log('*******Transaction Object in deposit : ',transaction);
        user.transactions.push(transaction);

        user.save();
        req.flash('success' , 'Money Deposited');
        return res.redirect('/user/profile');
    }
    
}


module.exports.withdraw = async function(req,res)
{
    let requests = await RequestMoney.find({$or: [
        {
            sender: req.user.id
        },{
            receiver: req.user.id
        }
    ]}).sort('-createdAt').populate('sender').populate('receiver');

    return res.render('personal_banking_views/withdraw',{
        title : "Withdraw money",
        all_requests : requests
    })
}

module.exports.withdraw_db = async function(req,res)
{
    let user = await User.findById(req.params.id);
        
    let amount = req.body.amount;
    let final = parseInt(amount,10);
    
    if(user.amount >= final)
    {
        let transaction = await Transactions.create
        ({
            sender : user.id,
            receiver : user.id,
            amount : final,
            deposit : false
        });

        console.log('*******Transaction Object in withdraw : ',transaction);
        user.transactions.push(transaction);

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
    
}

module.exports.transfer = async function(req,res)
{
    let requests = await RequestMoney.find({$or: [
        {
            sender: req.user.id
        },{
            receiver: req.user.id
        }
    ]}).sort('-createdAt').populate('sender').populate('receiver');

    return res.render('personal_banking_views/transfer',{
        title : "Transfer money",
        all_requests : requests
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
                let transaction = await Transactions.create
                ({
                    sender : user.id,
                    receiver : secondUser.id,
                    amount : final,
                    deposit : false
                });

                console.log('*******Transaction Object in transfer : ',transaction);
                user.transactions.push(transaction);
                secondUser.transactions.push(transaction);

                user.amount -= final;
                secondUser.amount +=final;
                req.flash('success' , 'Money Transfered');
                user.save();
                secondUser.save();
                return res.redirect('user/profile');
                
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
}

module.exports.request =async function(req,res)
{
    let requests = await RequestMoney.find({$or: [
        {
            sender: req.user.id
        },{
            receiver: req.user.id
        }
    ]}).sort('-createdAt').populate('sender').populate('receiver');

    return res.render('personal_banking_views/request',{
        title : "request money",
        all_requests : requests
    })
}

module.exports.send_request = async function(req,res)
{
        let user = await User.findById(req.params.id);
        let secondUser = await User.findOne({email : req.body.email});

        if(secondUser)
        {
            let amount = req.body.amount;
            let final = parseInt(amount,10);


            let request = await RequestMoney.create
            ({
                sender : user.id,
                receiver : secondUser.id,
                amount : final,
                completed : false
            });

            console.log('*******Request : ',request);
            user.money_request.push(request);
            secondUser.money_request.push(request);

            user.save();
            secondUser.save();   

        }

        else{
            req.flash('error' , 'Please Enter A valid user');
            return res.redirect('back');

        }
        return res.redirect('/user/profile');
}


module.exports.RequestMoneyTransfer = async function(req,res)
{
        let request = await RequestMoney.findById(req.params.id);

        let request_sender = await User.findById(request.sender._id);
        let request_receiver = await User.findById(request.receiver._id)

        if(request_receiver)
        {
            let amount = request.amount;
            let final = parseInt(amount,10);
            if(request_sender.amount >= final)
            {
                request_sender.amount += final;
                request_receiver.amount -=final;
                request.completed = true;

                request.save();

                let transaction = await Transactions.create
                ({
                    sender : request_sender.id,
                    receiver : request_receiver.id,
                    amount : final,
                    deposit : false
                });

                req.flash('success' , 'Money Transfered');

                request_sender.transactions.push(transaction);
                request_receiver.transactions.push(transaction);

                request_sender.save();
                request_receiver.save();
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