module.exports = function(bot){
	bot.dialog('Catalogo', [
		function(session){
			session.endDialog("cargando catalogo de productos...")
		}
	])	
}