const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.message = (body) => {

    let htmlString = nodeMailer.renderTemplate({body : body},'/message.ejs');

    nodeMailer.transporter.sendMail({
       from: 'Harsh@codeial.in',
       to: body.email,
       subject: "Message Sent!",
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