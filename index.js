import htmlEmail from './htmlEmail.js';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('deu certo'));

app.post('/mensagem', (req, res) => {
	const email = req.body.email;
	const mensagem = req.body.mensagem;

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
	.then((resposta) => res.send(`mensagem enviada`))
	.catch((erro) => res.send(`mensagem nao enviada`))
});



const port = 3000
app.listen(process.env.PORT || port, () => console.log(`servidor rodando na porta ${port}`), console.log(`acesse o link http://localhost:${port}`))