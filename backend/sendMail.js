const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  // connect with smtp server;
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      // Replace these values with your SMTP server credentials
      user: "jolie.wolf@ethereal.email",
      pass: "fyp7rWGr4ugJymWD52",
    },
  });
  const info = await transporter.sendMail({
    from: '"Harsh Jajal " <jolie.wolf@ethereal.email>', // sender address
    to: "jajalharsh268@gmail.com", // list of receivers
    subject: "Hello Jajal", // Subject line
    text: "Hello Jajal", // plain text body
    html: "<b>Hello Jajal</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  res.json(info);
};

module.exports = sendMail;
