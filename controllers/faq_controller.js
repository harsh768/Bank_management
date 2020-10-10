const RequestMoney = require('../models/request_money');

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