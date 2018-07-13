module.exports = function(bot){
	bot.dialog('Saludo', [
		function(session){
			session.endDialog("hola!!!!!!")
		}
	])	
}