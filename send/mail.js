const nodemailer = require('nodemailer');

async function sendMail(){
    const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: 'juveriyaqavi@gmail.com',
        pass: 'djskbnqerllwekwe'
    }
    })

    const mailOptions = {
        from: 'juveriyaqavi@gmail.com',
        to: 'jameemaqavi@gmail.com',
        subject: 'Test Mail',
        text: 'This is a test mail sent using Node.js and Nodemailer.',
    }
    try{
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully')
    }catch(error){
        console.log('Email send failed:', error)
    }
}
sendMail();