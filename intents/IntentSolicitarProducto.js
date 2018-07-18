module.exports = function(bot){
	var builder = require('botbuilder')
	bot.dialog('Solicitar Producto', [
		function(session){
			session.send("solicituar producto")		
		}
	])	
}