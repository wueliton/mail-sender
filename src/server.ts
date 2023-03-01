import express, { Request, Response, Router } from "express";
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const route = Router();
const port = process.env.PORT || 3000;
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

route.get("/", (_: Request, res: Response) => {
  res.json({ message: process.env.MAIL });
});

route.post(
  "/sendmail",
  (req: Request<{}, {}, { email: string }>, res: Response) => {
    if (!req.body.email)
      res
        .status(403)
        .json({ message: 'Necessário enviar "email" no corpo da requisição.' });
    const email = req.body.email;

    const mailOptions: MailOptions = {
      from: process.env.MAIL,
      to: "maharteecor@gmail.com",
      subject: "Nova inscrição - Workshop Belas Rosas",
      html: email,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      else console.log("E-mail enviado com sucesso");
    });
    res.status(200).end();
  }
);

app.use(route);

app.listen(port, () =>
  console.log(`Server runing on http://localhost:${port}`)
);
