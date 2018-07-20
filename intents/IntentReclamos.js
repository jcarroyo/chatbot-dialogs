module.exports = function(bot){
	var builder = require('botbuilder');
	bot.dialog('Reclamos', [
		function(session){
			var message = "Elige una opción";
			var choices=["Nuevo reclamo", "Estado del reclamo"];
			var options = {listStyle: builder.ListStyle.button};
			builder.Prompts.choice(session, message, choices, options);
		},
		function(session, results){
			//response: { index: 0, entity: 'Nuevo reclamo', score: 1 }
			var selectedOption = results.response.entity;
			if(selectedOption == "Nuevo reclamo"){
				session.beginDialog("NuevoReclamo")
			}
			if(selectedOption == "Estado del reclamo"){
				session.beginDialog("ConsultarReclamo")
			}
		}
	]);
	
	bot.dialog("NuevoReclamo", [


	]);

	bot.dialog("ConsultarReclamo", [
		function(session){
			builder.Prompts.text(session, "Ingrese el número de su reclamo");
		},
		function(session, results){
			session.sendTyping()
			setTimeout(function(){
				var consultaReclamo = getConsultaReclamo();
				session.send(
					`Fecha reclamo: ${consultaReclamo.fechaReclamo}\nMotivo: ${consultaReclamo.motivo}\nNúmero: ${consultaReclamo.numero}\nEstado: ${consultaReclamo.estado}\nResultado: ${consultaReclamo.resultado}`
			);
			}, 2000);
		}

	]);

	function getConsultaReclamo(){
		return {
			fechaReclamo: "2018-07-20",
			motivo: "Instalación con problemas",
			numero: "SERV-193432",
			estado: "ATENDIDA",
			resultado: "El técnico contactará con el cliente para programar visita"
		}
	}

}