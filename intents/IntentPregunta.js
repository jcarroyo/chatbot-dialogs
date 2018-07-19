module.exports = function(bot){
	var builder = require('botbuilder');
	var config = require('../config.json');
	var QNASDK = require('../qna_sdk');

	var QNAclient = QNASDK({
		knowledgeBaseId: config.AzureServices.QNA.knowledgeBaseId,
		authKey: config.AzureServices.QNA.authKey,
		endpointHostName: config.AzureServices.QNA.endpointHostName
	})

	function buildQuestionChoices(answers){
		var choices = [];
		answers.forEach(element => {
			element.questions.forEach(question => {
				choices.push(question);
			})
		});		
		return choices;
	}

	function hasValidQuestions(answers){
		return answers && answers[0].id != -1;
	}

	bot.dialog('Preguntas', [
		function(session){
			builder.Prompts.text(session, "¿Sobre que tema deseas información?");			
		},
		function(session, results){
			var question = results.response;
			QNAclient.query({question: question, top: 3}, {
				onSuccess: function(result){
					var answers = result.answers;
					if(hasValidQuestions(answers)){
						var choices = buildQuestionChoices(result.answers);
						var message = "Encontré las siguientes preguntas que te pueden interesar";
						var options = {listStyle: builder.ListStyle.button};
						builder.Prompts.choice(session, message, choices, options);
					}else{
						session.endDialog("Lo siento pero no tengo información para tu pregunta")
					}
				},
				onFailure: function(error){
					console.log(error);
					session.endDialog("Algo salió mal")
				}
			});
		},
		function(session, results){
			var question = results.response.entity;
			QNAclient.query({question:question, top: 1}, {
				onSuccess: function(result){
					var answer = result.answers[0].answer
					session.endDialog(answer);
				},
				onFailure: function(error){
					console.log(error);
					session.endDialog("Lo siento, hubo un problema")
				}
			})
		}
	])	
}