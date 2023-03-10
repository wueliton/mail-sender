"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const route = (0, express_1.Router)();
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
    },
    host: "smtp.gmail.com",
    port: 465,
});
app.use(express_1.default.json());
route.get("/", (req, res) => {
    res.json({ message: process.env.MAIL });
});
route.get("/sendmail", (req, res) => {
    const mailOptions = {
        from: process.env.MAIL,
        to: "maharteecor@gmail.com",
        subject: "Exemplo de um Assunto",
        html: "<p>Exemplo de um Assunto</p>",
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log(err);
        else
            console.log("E-mail enviado com sucesso");
    });
    res.status(200).end();
});
app.use(route);
app.listen(3333, () => console.log("Server runing on http://localhost:3333"));
