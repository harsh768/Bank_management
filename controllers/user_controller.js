const User = require('../models/user');
const Transactions = require('../models/transactions');
const forgot_password_mailer = require('../mailers/forgot_password_mailer');
const RequestMoney = require('../models/request_money');

//for deleting avatar
const fs = require('fs');
const path = require('path'); 

module.exports.create = async function(req,res)
{
    try {
        User.uploadedAvatar(req,res,async function(err)
        {
            if(err) {console.log('* error in multing ',err); return}

            if (req.body.password != req.body.confirm_password){
                req.flash('error','Passwords entered are different' );
                return res.redirect('back');
            }
    
            console.log('req.body ', req.body);
            console.log('name ' , req.body.name);
            console.log('req.file ',req.file);
            let user = await User.findOne({email: req.body.email});
        
            if (!user){
                let newuser = await User.create(req.body);

                    // var x = Math.floor((Math.random() * 100000000100) + 100000000000);
                    // newuser.account_number = x;
        
                if(req.file)
                {
                    if(newuser.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    //this is saving the path of upload file into the avatar field in the user
                    newuser.avatar = User.avatarPath + '/' + req.file.filename;
                }
    
                await newuser.save();

                req.flash('success','New User created');
                return res.redirect('/user/login');

            } else{
                req.flash('success','Email Id already there!');
                return res.redirect('/user/login');
            }
        })
            
    } catch (err) {

        console.log('catch error',err);
    
    }

}

module.exports.balance = async function(req,res)
{
    
    let requests = await RequestMoney.find({$or: [
        {
            sender: req.user.id
        },{
            receiver: req.user.id
        }
    ]}).sort('-createdAt').populate('sender').populate('receiver');

    let user = await User.findById(req.params.id);
    return res.render('personal_banking_views/balance',{
        title : "balance",
        all_requests : requests,
        balance : user.amount
    });

}

module.exports.details = async function(req,res)
{
    let requests = await RequestMoney.find({$or: [
        {
            sender: req.user.id
        },{
            receiver: req.user.id
        }
    ]}).sort('-createdAt').populate('sender').populate('receiver');

    let user = await User.findById(req.params.id);
    return res.render('personal_banking_views/details',{
        title : "balance",
        all_requests : requests,
        user : user
    });
}

module.exports.update = async function(req,res)
{
    let requests = await RequestMoney.find({$or: [
        {
            sender: req.user.id
        },{
            receiver: req.user.id
        }
    ]}).sort('-createdAt').populate('sender').populate('receiver');

    return res.render('personal_banking_views/updateDetails',{
        title : "balance",
        all_requests : requests
    });

}

module.exports.update_db = async function(req,res)
{
    try {

        let user = await User.findById(req.params.id);

        User.uploadedAvatar(req,res,async function(err)
        {
            if(err)
            {   console.log('*****Multer error',err); return; }

            user.phone = req.body.phone;
            user.email = req.body.email;

            if(req.file)
            {
                if(user.avatar)
                {
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }

                //this is saving the path of upload file into the avatar field in the user
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }

            await user.save();
            return res.redirect('back');
        })
        user.save();

        return res.redirect(`/user/account-details/${user.id}`);

    } catch (error) {
        req.flash('error',err);
        return res.redirect('back');  
    }

    

}

module.exports.profile = async function(req,res)
{

    if(req.isAuthenticated())
    {
        let requests = await RequestMoney.find({$or: [
            {
                sender: req.user.id
            },{
                receiver: req.user.id
            }
        ]}).sort('-createdAt').populate('sender').populate('receiver');
    
        return res.render('personal_banking',{
            title : "Profile Page",
            all_requests : requests
        });
        
    }

    return res.render('personal_banking',{
        title : "Profile Page"
    });
        
}

module.exports.login = function(req,res)
{
    if(req.isAuthenticated())
    {
        console.log(req.flash , req.user) ;
        return res.redirect(`/users/profile`);

    }
    return res.render('login',{
        title : "Login Page",
    });
}

module.exports.forgot_password = function(req,res)
{
    return res.render('forgot_password',{
        title : "Forgot password",
    });
}

module.exports.forgot_password_form = function(req,res)
{
    User.findOne({email : req.body.email},function(err,user){
        if(user){
            forgot_password_mailer.forgotpassword(user);
            req.flash('success', "Link sent on Email Id");
            return res.redirect('/');
        }

        else {
            req.flash('error',"No existing User with entered Email Id");
            return res.redirect('back');
        }
    });


}

module.exports.resetpassword = function(req,res)
{
    return res.render('resetpassword',{
        title : "Reset Password"
    });
}

module.exports.resetpasswordform = function(req,res)
{
    User.findOne({email : req.body.email},function(err,user){

        if(user)
        {
            if(req.body.password == req.body.confirm_password)
            {
                user.password = req.body.password;
                user.save();
                req.flash('success',"Password changed Successfully");
                return res.redirect('/user/login');
            }

            else {
                req.flash('error',"password entered are different");
                return res.redirect('back');
            }
        }

        else {
            req.flash('error',"No existing User with entered Email Id");
            return res.redirect('back');
        }

    });

}

module.exports.transactions = async function(req,res)
{
    let requests = await RequestMoney.find({$or: [
        {
            sender: req.user.id
        },{
            receiver: req.user.id
        }
    ]}).sort('-createdAt').populate('sender').populate('receiver');

    let transactions = await Transactions.find({$or: [
        {
            sender: req.params.id
        },{
            receiver: req.params.id
        }
    ]}).sort('-createdAt').populate('sender').populate('receiver');

    return res.render('personal_banking_views/transactions',{
        title : "Recent Transactions Page",
        all_transactions : transactions,
        all_requests : requests
    });
}

module.exports.sign_up = function(req,res)
{
    return res.render('sign_up',{
        title : "Sign-Up Page"
    });
}

module.exports.createSession = function(req,res){
    req.flash('success','Logged in successfully');    //This is currently in req to pass in res create own middleware
    return res.redirect('/');
}

//Signing out
module.exports.destroySession = function(req,res)
{
    req.logout();
    req.flash('success','You have logged out!');

    return res.redirect('/');
}

