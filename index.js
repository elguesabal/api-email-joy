import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import htmlEmail from "./htmlEmail.js";
import cors from "cors";
import {emails, resetEmail} from "./saveEmail.js";

const app = express();
dotenv.config();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

let requests = {"count": 0, "email": ""};

app.get('/count', (req, res) => res.send(`${requests.count}`));

app.get('/emails', (req, res) => res.send(requests.email));

app.get('/reset', (req, res) => (resetEmail(requests), res.send("reset")));

app.post('/mensagem', (req, res) => {
	const email = req.body.email;
	const mensagem = req.body.mensagem;

	emails(requests, mensagem);

	const transport = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.SENHA
        }
	});
	const emailCliente = htmlEmail();
	const dadosEmail = {
		from: `RECOM`,
		to: email,
		replyTo: mensagem,
		subject: 'Obrigado por enviar uma mensagem!',
		html: emailCliente,
		text: `Agradeço o contato e em breve estaremos respondendo!`
	};
	transport.sendMail(dadosEmail)
	.then((resposta) => res.status(200).send("sucess"))
	.catch((erro) => res.status(500).send("error"));
});


app.post('/teste', (req, res) => {
	if (req.mensagem != undefined) {
		res.status(200).send("sucess");
	} else {
		res.status(500).send("error");
	}
});


const port = 3000
app.listen(process.env.PORT || port, () => console.log(`servidor rodando na porta ${port}`), console.log(`acesse o link http://localhost:${port}`))