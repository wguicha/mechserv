const nodemailer = require('nodemailer');
const {
    USER_NAME_MAILTRAP, USER_PASSWORD_MAILTRAP
  } = process.env;

function sendNotification (mailOptions) {
    mailOptions = {...mailOptions, from: 'notifications@mechserv.com',}

    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: USER_NAME_MAILTRAP,
        pass: USER_PASSWORD_MAILTRAP
        }
    });
/*
    const mailOptions = {
        from: 'notifications@mechserv.com',
        to: 'williamalberto1@hotmail.com',
        subject: 'Confirmación de Registro',
        text: `¡Gracias por registrarte!`,
    };
*/
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo de confirmación');
    } else {
        console.log('Correo enviado: ' + info.response);
        res.status(200).send('Correo de confirmación enviado');
    }
    });



}

module.exports = sendNotification;