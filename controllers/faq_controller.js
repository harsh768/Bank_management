module.exports.home = function(req,res)
{
    return res.render('faq',{
        title : "FAQ",
    });
}