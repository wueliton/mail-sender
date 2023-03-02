const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const serverless = require("serverless-http");

dotenv.config();

const app = express();
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
  host: "smtp.gmail.com",
  port: 465,
});

app.use(express.json());

router.get("/", (_, res) => {
  res.json({ message: process.env.MAIL });
});

router.post("/sendmail", (req, res) => {
  if (!req.body.email)
    res
      .status(403)
      .json({ message: 'Necessário enviar "email" no corpo da requisição.' });
  const email = req.body.email;

  const mailOptions = {
    from: process.env.MAIL,
    to: "maharteecor@gmail.com",
    bcc: "wueliton.horacio@gmail.com",
    subject: "Nova inscrição - Workshop Belas Rosas",
    html: email,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) res.status(500).json({ message: err });
    else res.status(200).end();
  });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
