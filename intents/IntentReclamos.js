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
		//Nombres o Razón Social:
		function(session){
			session.userData.reclamo = {};
			builder.Prompts.text(session, "Nombres o Razón Social");
		},
		//Apellidos
		function(session, result){
			session.userData.reclamo.nombres = result.response;
			builder.Prompts.text(session, "Apellidos");
		},
		//Tipo documento
		function(session, result){
			session.userData.reclamo.apellidos = result.response;
			var message = "Tipo de documento";
			var choices = ["Carnet de extranjeria", "DNI", "Pasaporte", "RUC"];
			var options = {listStyle: builder.ListStyle.button};
			builder.Prompts.choice(session, message, choices, options);
		},
		//Número de documento
		function(session, result){
			session.userData.reclamo.tipoDocumento = result.response.entity;
			builder.Prompts.text(session, "Número de documento");
		},
		//Telefono
		function(session, result){
			session.userData.reclamo.numeroDocumento = result.response;
			builder.Prompts.text(session, "telefono");
		},
		//Correo
		function(session, result){
			session.userData.reclamo.telefono = result.response;
			builder.Prompts.text(session, "Correo");
		},
		//Tipo de cliente
		function(session, result){
			session.userData.reclamo.correo = result.response;
			var message = "Tipo de cliente";
			var choices = ["Comercial", "Constructora", "GNC", "GNV", "Industrial", "Residencial"];
			var options = {listStyle: builder.ListStyle.button};
			builder.Prompts.choice(session, message, choices, options); 
		},
		//Dirección ocurrencia
		function(session, result){
			session.userData.reclamo.tipoCliente = result.response;
			builder.Prompts.text(session, "Ingrese dirección completa");
		},
		//Presenta resumen y solicitar confirmación
		function(session, result){
			session.userData.reclamo.direccion = result.response;
			var reclamo = session.userData.reclamo;
			var msg = `Nombre o razón social: ${reclamo.nombres} ${reclamo.apellidos}\nTipo de documento: ${reclamo.tipoDocumento}\nNúmero de documento:${reclamo.numeroDocumento}\nTeléfono: ${reclamo.telefono}\nCorreo: ${reclamo.correo}\nTipo de cliente: ${reclamo.tipoCliente}\nDirección: ${reclamo.direccion}`;
			session.send(msg);
			builder.Prompts.confirm(session, "¿Es correcta la solicitud?")
		},
		//Acción a la confirmación
		function(session, result){
			if(result.response){
				session.sendTyping();
				setTimeout(function(){
					session.endDialog("La solicitud ha sido generada\nSu número de atención es 123456");
				}, 2500);
			}else{
				builder.Prompts.confirm(session, "¿Desea volver a ingresar el reclamo?")
			}
		},
		//Reintento reclamo
		function(session, result){
			if(result.response){
				session.beginDialog("NuevoReclamo");
			}else{
				session.endDialog("¡Hasta otra oportunidad!");
			}
		}
	]);

	bot.dialog("ConsultarReclamo", [
		function(session){
			builder.Prompts.text(session, "Ingrese el número de su reclamo");
		},
		function(session, results){
			session.sendTyping()
			setTimeout(function(){
				var consultaReclamo = getConsultaReclamo();
				session.endDialog(
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