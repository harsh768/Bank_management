const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    
    service : 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'guptaharsh768', // generated gmail user
      pass: 'Hello6549@123@newpassword' // generated gmail password
    },
    tls: {
        rejectUnauthorized: false
    }

});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template',err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}