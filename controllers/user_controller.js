const User = require('../models/user');

module.exports.create = function(req,res)
{
    if (req.body.password != req.body.confirm_password){
        req.flash('error','Passwords entered are different' );
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('*********error in creating user while signing up',err); return}

                req.flash('success','New User created');
                return res.redirect('/user/login');
            })
        }else{
            req.flash('success','Email Id already there!');
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

module.exports.sign_up = function(req,res)
{
    return res.render('sign_up',{
        title : "Sign-Up Page",
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