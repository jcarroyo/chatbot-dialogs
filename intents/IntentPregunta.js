module.exports = function(bot){
	bot.dialog('Pregunta', [
		function(session){
			session.endDialog("cargando las preguntas...")
		}
	])	
}