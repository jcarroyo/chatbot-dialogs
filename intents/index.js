module.exports = function(bot){
	require('./IntentCatalogo')(bot)
	require('./IntentDespedida')(bot)
	require('./IntentNone')(bot)
	require('./IntentPregunta')(bot)
	require('./IntentFacturacion')(bot)
	require('./IntentSolicitarServicio')(bot)
	require('./IntentReclamos')(bot)
}