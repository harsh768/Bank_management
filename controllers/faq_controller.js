const RequestMoney = require('../models/request_money');
const User = require('../models/user');
const message_mailer = require('../mailers/message_mailer');

module.exports.home = async function(req,res)
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
    
        return res.render('faq',{
            title : "FAQ",
            all_requests : requests
        });
        
    }

    return res.render('faq',{
        title : "FAQ"
    });
}

module.exports.message = async function(req,res)
{

    console.log('req.body : ',req.body);
    message_mailer.message(req.body);
    req.flash('success',"Message Sent");
    console.log('Message Mailer');
    return res.redirect('/faq');

}