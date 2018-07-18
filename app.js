var restify = require('restify')
var builder = require('botbuilder')
var LUISSDK = require('./luis_sdk')
var config = require('./config.json')

//App configuration

//Initialize LUIS
var LUISclient = LUISSDK({
  appId: config.AzureServices.LUIS.appId,
  appKey: config.AzureServices.LUIS.key,
  verbose: true
})

//***Setup Restify Server***
var server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url) 
})

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
})

// Listen for messages from users 
server.post('/api/messages', connector.listen())

//***App Logic***
var bot = new builder.UniversalBot(connector, [
	function(session){
		session.sendTyping()
		setTimeout(function(){
			session.send("Bienvenido a nuestro chatbot de Calidda!!!")		
			session.beginDialog("rootMenu")
		}, 2000)		
	}/*,	
	function(session){
		session.endConversation("Adiossss!")
	}*/
])

//Dialogs & Intents
require('./intents')(bot)

bot.dialog('rootMenu', [
	function(session){
		var message = "Vamos a empezar...¿cómo puedo ayudarte?"
		var choices = ["Conoce tu facturación", "Solicita un servicio", "Consultas", "Reclamos"]
		var options = {listStyle: builder.ListStyle.button}
		builder.Prompts.choice(session, message, choices, options)
	},
	function(session, results){
		var userInput = results.response.index
		//console.log(results.response) -> { index: 0, entity: 'Conoce tu facturación', score: 1 }
		switch(userInput){
			case 0: {
				session.beginDialog('Recibo');
				break;
			}
			default:{
				session.send("???")
			}
		}
		/*LUISclient.predict(userInput, {
			onSuccess: function (response) {
				var intent = response.topScoringIntent.intent
				session.beginDialog(intent)
			},
			onFailure: function(err){
				console.log(err)
				session.send("oucrrio un error")
			}
		})*/
	}
])