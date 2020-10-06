module.exports.home = function(req,res)
{
    return res.render('home',{
        title : "DTU BANK",
    });
}

module.exports.game = function(req,res)
{
    return res.render('game',{
        title : "Game",
    });
}