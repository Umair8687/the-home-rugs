// server.js
// Load environment variables
require('dotenv').config();

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

  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.EMAIL_RECIPIENT) {
    console.error("Missing required environment variables");
    return res.status(500).send("❌ Server configuration error.");
  }

  // Create transporter for Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email details
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIPIENT,
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// require('dotenv').config();
// const app = require('express')();

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// const PORT = process.env.PORT || 3000;
// app.listen(3000, () => console.log('App listening on port 3000!'));