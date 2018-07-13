module.exports = function(bot){
	require('./IntentCatalogo')(bot)
	require('./IntentDespedida')(bot)
	require('./IntentNone')(bot)
	require('./IntentPregunta')(bot)
	require('./IntentRecibo')(bot)
	require('./IntentSaludo')(bot)
	require('./IntentSolicitarServicio')(bot)
}