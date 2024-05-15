const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    const { email, sujet, body } = req.body;
    let transporter = nodemailer.createTransport({
      host: "smtp.imitate.email",
      auth: {
        user: process.env.EMAIL, // you email 
        pass: process.env.PASSWORD, // you email app password
      },
    });

    //sendmail
    await transporter.sendMail({
      from: 'multiversal.guru@gmail.com', // you email
      to: email, // to email
      subject: sujet,
      text: body
    });
    res.status(200).json("Envoyer un mail avec succès");
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = sendMail;