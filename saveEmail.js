function emails(requests, mensagem) {
	requests.count++;
	requests.email += "<p>";
	requests.email += mensagem;
	requests.email += "</p>";
}

function resetEmail(requests) {
	requests.count = 0;
	requests.email = "";
}

export {emails, resetEmail};