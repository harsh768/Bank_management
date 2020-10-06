const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.forgotpassword = (user) => {

    let htmlString = nodeMailer.renderTemplate({user : user},'/forgot_password.ejs');

    nodeMailer.transporter.sendMail({
       from: 'Harsh@codeial.in',
       to: user.email,
       subject: "Reset Password",
       html: htmlString, 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}