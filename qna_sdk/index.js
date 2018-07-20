"use strict";

var request = require('request');

var QNAClient = function(initData){
    var knowledgeBaseId = initData.knowledgeBaseId,
    authKey = initData.authKey,
    endpointHostName = initData.endpointHostName;
    validateAppInfoParam(authKey, 'AuthKey');
    validateAppInfoParam(endpointHostName, 'Endpoint Hostname');

    return {
        query: function(data, responseHandlers){
            validateResponseHandlers(responseHandlers);

            var uri = `${endpointHostName}/knowledgebases/${knowledgeBaseId}/generateAnswer`;
            console.log(uri);
            var options = {
                url: uri,
                headers: {
                    "Authorization": `EndpointKey ${authKey}`,
                    "Content-Type": "application/json"
                },
                json: true,
                method: 'POST',
                body: {
                    question: data.question,
                    top: data.top
                }
            };
            
            request(options, function(err, response, body){
                if(err){
                    return responseHandlers.onFailure(err);
                }
                return responseHandlers.onSuccess(body);
            });
        }
    }
}

var validateAppInfoParam = function (appInfoParam, appInfoParamName) {
    validateStringParam(appInfoParam, appInfoParamName);
    if (appInfoParam === "") {
      throw new Error("Empty " + appInfoParamName);
    }
    if (appInfoParam.indexOf(" ") !== -1) {
      throw new Error("Invalid " + appInfoParamName);
    }
};

var validateResponseHandlers = function (responseHandlers) {
    if (typeof responseHandlers === "undefined" || responseHandlers === null) {
      throw new Error("You have to provide a response handlers object " +
        "containing 'onSuccess' and 'onFailure' functions")
    }
    if (!responseHandlers.hasOwnProperty("onSuccess") || typeof responseHandlers.onSuccess === "undefined"
      || responseHandlers.onSuccess === null || typeof responseHandlers.onSuccess !== "function") {
      throw new Error("You have to provide an 'onSuccess' function as a property " +
        "of the response handlers object")
    }
    if (!responseHandlers.hasOwnProperty("onFailure") || typeof responseHandlers.onFailure === "undefined"
      || responseHandlers.onFailure === null || typeof responseHandlers.onFailure !== "function") {
      throw new Error("You have to provide an 'onFailure' function as a property " +
        "of the response handlers object")
    }
};

var validateStringParam = function (param, paramName) {
    if (typeof param === "undefined" || param === null) {
      throw new Error("Null or undefined " + paramName);
    }
    if (typeof param !== "string") {
      throw new Error(paramName + " is not a string");
    }
  };

module.exports = QNAClient;