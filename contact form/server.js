// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route for sending email
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  // Create transporter for Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thehomerugs1@gmail.com",         // ✨ your Gmail ID
      pass: "jhkcqpqvwspemgin",      // ✨ your Google App Password
    },
  });

  // Email details
  const mailOptions = {
    from: 'thehomerugs1@gmail.com',
    to: "jameemaqavi@gmail.com",             // where you’ll receive the message
    subject: `New message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  // Try sending email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("✅ Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Error sending message.");
  }
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));


// require('dotenv').config();
// const app = require('express')();

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// const PORT = process.env.PORT || 3000;
// app.listen(3000, () => console.log('App listening on port 3000!'));