const nodemailer = require("nodemailer");

const account ={ 
  user: "guigng@gmail.com",
  pass: "18GoldCoast"
}

module.exports = {
    send: function(message){
      sender(message);
    }
}



async function sender(html){
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: 'guigng@gmail.com', // sender address
    to: "guilherme@netaware.com.au, mohanad@netaware.com.au", // list of receivers
    subject: "DFSR Monitor", // Subject line
    html: html // html body
  };

  try
  {
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  catch(e)
  {
    console.log(e.message);
  }
  

}