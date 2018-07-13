module.exports = function(bot){
	var builder = require('botbuilder')
	bot.dialog('Solicitar Servicio', [
		//TIPO DOCUMENTO
		function(session){
			session.send("Para la solicitud del servicio vamos a necesitar algunos de tus datos...")			
			builder.Prompts.choice(session, "Tipo de documento:", 'Carnet de extranjería|DNI|Pasaporte|RUC')
		},
		//NUMERO DOCUMENTO
		function(session, results){
			var tipoDocumento = results.response.entity

			session.userData.tipoDocumento = tipoDocumento
			builder.Prompts.text(session, `¿Cuál es tu # de ${tipoDocumento}?`)			
		},
		//NOMBRES
		function(session, results){
			var numeroDocumento = results.response
			
			session.userData.numeroDocumento = numeroDocumento
			builder.Prompts.text(session, "Sus nombres completos")
		},
		//APELLIDOS
		function(session, results){
			var nombres = results.response
			
			session.userData.nombres = nombres
			builder.Prompts.text(session, "Sus apellidos completos")
		},
		//CORREO
		function(session, results){
			var apellidos = results.response
			
			session.userData.apellidos = apellidos
			builder.Prompts.text(session, "Su correo")
		},
		//DIRECCION
		function(session, results){
			var correo = results.response

			session.userData.correo = correo
			builder.Prompts.text(session, "Dirección completa (Departamento-Provincia-Distrito-Dirección")
		},
		//Confirmación de la orden
		function(session, results){
			var direccion = results.response

			session.userData.direccion = direccion
			var msg = new builder.Message()
				.address(session.message.address)
				.attachments([
                     new builder.HeroCard(session)
                     .title("Orden del pedido")
                     .subtitle("Detalle")
                     .text(
                     	`Tipo de documento: ${session.userData.tipoDocumento}
                     	 # documento: ${session.userData.numeroDocumento}
                     	 Nombres: ${session.userData.nombres}
                     	 Apellidos: ${session.userData.apellidos}
                     	 Correo: ${session.userData.correo}
                     	 Dirección: ${session.userData.direccion}
                     `)
             ])
			bot.send(msg)
			builder.Prompts.confirm(session, "¿Es correcta la orden?")
		},
		//Confirmación
		function(session, results){
			var confirmacion = results.response
			if(confirmacion){
				session.endDialog("Gracias por hacer su pedido")
			}else{
				session.send("Volvamos a empezar...")
				session.replaceDialog('Solicitar Servicio')
			}
		}
	])	
}