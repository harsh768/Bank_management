const { request } = require('express');
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
    
        console.log('#####Requests ',requests);

        return res.render('home',{
            title : "DTU BANK",
            all_requests : requests
        });
        
    }

    let requests = [];

    return res.render('home',{
        title : "DTU BANK",
        all_requests : requests
    });
}

module.exports.game = function(req,res)
{
    return res.render('game',{
        title : "Game",
    });
}