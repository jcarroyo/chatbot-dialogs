module.exports = function(bot){
	var builder = require('botbuilder')
	bot.dialog('Recibo', [
		function(session){
			builder.Prompts.text(session, "¿Cuál es tu DNI?")
		},
		function(session, results){
			var dni = results.response;
			session.send("Dame unos minutos para buscar tu recibo")
			session.sendTyping();
			setTimeout(function(){
				var reply = new builder.Message()
					.setText(session, "Recibo de julio 2018")
					.addAttachment({ fallbackText: "Gracias por nada", contentType: 'image/jpeg', contentUrl: "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2729462.jpg" })
				session.send(reply)
			}, 3500)
		}
	])	
}