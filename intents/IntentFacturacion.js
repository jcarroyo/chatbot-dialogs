module.exports = function(bot){
	var builder = require('botbuilder')
	bot.dialog('Facturacion', [
		function(session){
			builder.Prompts.text(session, "¿Cuál es tu DNI?");
		},
		function(session, results){
			session.userData.dni = results.response;
			builder.Prompts.text(session, "¿Cuál es su número de abonado?");
		},
		function(session, results){
			var numeroAbonado = results.response;
			var dni = session.userData.dni;
			session.send("Dame unos minutos para buscar tu recibo")
			session.sendTyping();
			setTimeout(function(){
				var recibo = getRecibo();
				session.endDialog({
					text: "Tu recibo de Julio-2018",
					attachments: [
						{
							contentType: "application/pdf",
							contentUrl: recibo.contentUrl,
							name: recibo.name
						}
					]
				})
			}, 2500);		
		}
	])
	
	function getRecibo(){
		return {
			contentUrl: "https://www.getharvest.com/downloads/Invoice_Template.pdf",
			name: "Recibo_Julio2018.pdf"
		}
	}
	
}