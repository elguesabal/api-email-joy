import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import htmlEmail from './htmlEmail.js';
import emails from './saveEmail.js'

const app = express();
dotenv.config();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/count', (req, res) => res.send(process.env.COUNT_EMAILS));

app.get('/reset', (req, res) => {
	process.env.COUNT_EMAILS = 0;
	process.env.EMAILS = "";
	res.send("COUNT_EMAIL=0");
});

app.get('/emails', (req, res) => {
	res.send(process.env.EMAILS);
});

app.post('/mensagem', (req, res) => {
	const email = req.body.email;
	const mensagem = req.body.mensagem;

	emails(mensagem);
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
		from: `enviado de <${process.env.EMAIL}>`,
		to: email,
		replyTo: mensagem,
		subject: 'Obrigado por me enviar uma mensagem!',
		html: emailCliente,
		text: `Agradeço o contato e em breve estarei respondendo!`
	};
	transport.sendMail(dadosEmail)
	.then((resposta) => res.send(`<h1>mensagem enviada</h1> <p>Clique <a href="https://elguesabal.github.io/trabalho-em-grupo-joy/src/contato">neste link<a> para voltar a página</p>`))
	.catch((erro) => res.send(`<h1>mensagem nao enviada</h1> <p>Clique <a href="https://elguesabal.github.io/trabalho-em-grupo-joy/src/contato">neste link<a> para voltar a página</p>`))
});


const port = 3000
app.listen(process.env.PORT || port, () => console.log(`servidor rodando na porta ${port}`), console.log(`acesse o link http://localhost:${port}`))