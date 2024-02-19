
    const nodemailer = require('nodemailer');

    // Create a transporter object using Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
    });
    
    // Function to send verification email
    function sendVerificationEmail(email, message) {
        // Email content
        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: 'Email Verification',
            text: `Please click on the following link to verify your email: ${message}`,
            html: `<p>Please click on the following link to verify your email:</p><p><a href="${message}">Verify Email</a></p>`
        };
    
        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
    
    module.exports = {
        sendVerificationEmail,
      };
      
