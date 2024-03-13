const nodemailer = require('nodemailer');
module.exports=async(email,subject,text)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            service:process.env.SERVICE,
            post:Number(process.env.MAIL_PORT),
            secure:Boolean(process.env.SECURE),
    } catch (error) {
        
    }
}
