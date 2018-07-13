module.exports = function(bot){
	bot.dialog('Recibo', [
		function(session){
			session.endDialog("ta que maestro")
		}
	])	
}