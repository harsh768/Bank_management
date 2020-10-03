const User = require('../models/user');

module.exports.create = function(req,res)
{
    if (req.body.password == "Okay"){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                req.flash('success','New User created');
                return res.redirect('/users/login');
            })
        }else{
            return res.redirect('back');
        }

    });
}


module.exports.profile = function(req,res)
{
    return res.render('personal_banking',{
        title : "Profile",
    });
}

module.exports.login = function(req,res)
{
    return res.render('login',{
        title : "Login Page",
    });
}

module.exports.forgot_password = function(req,res)
{
    return res.render('forgot_password',{
        title : "Login Page",
    });
}

module.exports.sign_up = function(req,res)
{
    return res.render('sign_up',{
        title : "Sign-Up Page",
    });
}