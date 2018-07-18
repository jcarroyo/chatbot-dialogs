module.exports = function(bot){
	var builder = require('botbuilder')
	bot.dialog('Preguntas', [
		function(session){
			builder.Prompts.text(session, "¿Sobre que tema deseas información?")			
		},
		function(session, results){
			session.endDialog("Deseas saber sobre " + results.response)
		}
	])	
}