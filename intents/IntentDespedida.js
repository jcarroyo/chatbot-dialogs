module.exports = function(bot){
	bot.dialog('Despedida', [
		function(session){
			session.endConversation("gracias por ponerte en contacto con nosotros")
		}
	])	
}