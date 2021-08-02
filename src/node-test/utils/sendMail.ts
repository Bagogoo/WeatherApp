import nodemailer  from 'nodemailer';

export async function sendEmail(email:string, url: string) {
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'michalmonka97@gmail.com',
      pass: 'jq2OTDICNa6nz0QM', 
    },
  });

  const info = await transporter.sendMail({
    from: '"Porownywarka pogody" <bok@porownywarka.pl>', // sender address
    to: email,
    subject: "Potwierdz rejestracje", // Subject line
    text: "Witaj, kliknij w link aby potwierdzic rejestracje.", // plain text body
    html: `<a href="${url}">${url}</a>`,
  });

  console.log("Message sent: %s", info.messageId);
}
