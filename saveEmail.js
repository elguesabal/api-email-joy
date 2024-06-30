export default function emails(mensagem) {
	process.env.COUNT_EMAILS++;
	process.env.EMAILS += "<p>";
	process.env.EMAILS += mensagem;
	process.env.EMAILS += "</p>";
}