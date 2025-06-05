const nodemailer = require("nodemailer");

async function sendEmail(req, res) {
  try {
    console.log(req.body);
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    // Wrap in an async IIFE so we can use await.
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text, // plain‑text body
        html: req.body.html, // HTML body
      });

      console.log("Message sent:", info.messageId);

    res.status(200).json({
      success: true,
      messageId: info.messageId,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send email",
      details: error.message,
    });
  }
}
module.exports = {
  sendEmail,
};
