module.exports = function(bot){
	var builder = require('botbuilder')
	//var servicioCatalogo = require.main.require('./services/ServiceCatalogo.js')
	var servicioCatalogo = require('../services/ServiceCatalogo.js')
	function getCardsAttachmentsCatalogo(session){
		var productos = servicioCatalogo.getCatalogo()
		var cards = []
		productos.forEach(function(producto){
			var card = new builder.HeroCard(session)
				.title(producto.nombre)
				.subtitle(producto.categoria)
				.text(`Precio oferta: ${producto.precioOferta} Precio regular: ${producto.precioRegular}`)
				.images([
					builder.CardImage.create(session, producto.imagen)
				])
			cards.push(card)
		})
		return cards
	}

	bot.dialog('Catalogo', [
		function(session){
			session.send("cargando catalogo de productos...")
			var cards = getCardsAttachmentsCatalogo(session)
			var reply = new builder.Message(session)
				.attachmentLayout(builder.AttachmentLayout.carousel)
				.attachments(cards)
			session.send(reply)
		}
	])	
}