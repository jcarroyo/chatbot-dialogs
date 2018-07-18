module.exports = function(bot){
	bot.dialog('Reclamos', [
		function(session){
			session.endDialog("estas molesto?")
		}
	])	
}