module.exports = function(bot){
	bot.dialog('None', [
		function(session){
			session.endDialog("lo siento, no te entiendo")
		}
	])	
}