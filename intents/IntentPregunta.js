module.exports = function(bot){
	var builder = require('botbuilder')
	var cognitiveServices = require('botbuilder-cognitiveservices');
	var config = require('../config.json')


	//Initialize QNA
	var recognizer = new cognitiveServices.QnAMakerRecognizer({
		knowledgeBaseId: config.AzureServices.QNA.knowledgeBaseId,  
		authKey: config.AzureServices.QNA.authKey,
		endpointHostName: config.AzureServices.QNA.endpointHostName
	});
		
	var basicQnAMakerDialog = new cognitiveServices.QnAMakerDialog({
		recognizers: [recognizer],
		defaultMessage: 'Lo siento no te entiendo, aún estoy aprendiendo',
		qnaThreshold: 0.3
	});

	
	bot.dialog('Preguntas', basicQnAMakerDialog);

	/*bot.dialog('Preguntas', [
		function(session){
			builder.Prompts.text(session, "¿Sobre que tema deseas información?")			
		},
		function(session, results){
			session.endDialog("Deseas saber sobre " + results.response)
		}
	])	*/
}