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