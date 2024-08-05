/*
Created Date : 14-APR-2021
Created By : HYNIVA
Description : This service handles REST API calls by using the medata data object records config
*/
public class APIHandler {
    
    public class APIHandlerRequest {
        public String authType;
        public String body;
        public String service;
        public String authCode;
        public String queryString;
	}
    
    public static webServiceResponse apiCall(APIHandler.APIHandlerRequest requestObject){
        HttpRequest request;
        HttpResponse response;
        try
        {
            if (requestObject == null || requestObject.service == null) {
                //return new webServiceResponse('API Error: Missing service end-point', false, '400');
            }
            API_Config__mdt apiConfig = [Select Id,Body__c,Headers__c,Header_Values__c,Host__c,Method_Type__c,Timeout__c from API_Config__mdt Where DeveloperName=:requestObject.service];
            if(apiConfig == null){
                return new webServiceResponse('API Error: Missing service end-point Metadata definition', false, '400');
            }
            request = new HttpRequest();
            // if authtype required, then set the authorization token to the header
            if (String.isNotBlank(requestObject.authType)) {
                setAuthorizationHeader(request, requestObject.authCode, requestObject.authType);
            }
            string endPoint = apiConfig.Host__c;
            if (String.isNotBlank(requestObject.queryString))
                endPoint = endPoint + (requestObject.queryString.substring(0,1) != '?' ? '?' : '') + requestObject.queryString;
            request.setEndpoint(endPoint);
            request.setMethod(apiConfig.Method_Type__c);
            
            setHeaders(request, apiConfig.Headers__c, apiConfig.Header_Values__c);
            
            if(String.isNotBlank(apiConfig.Body__c)){
                request.setBody(apiConfig.Body__c);
            }
            //Ravi Theja Panem(HYNIVA): Added this condition for set the body as save application json
            if(String.isNotBlank(requestObject.body) && String.isBlank(apiConfig.Body__c)) {
                request.setBody(requestObject.body);
            }
            response = new Http().send(request);
            //Ravi Theja Panem(HYNIVA)
            //TODO: Added extra param value for fix the Ambiguity issue, Once resolved this make it this a common method then remove the extra param value.
            return new webServiceResponse(response.getStatus(), true, String.valueOf(response.getStatusCode()), response.getBody(), '');
        } catch (Exception ex) {
            System.assert(false, 'API Call failed ' + JSON.serialize(ex));
            return new webServiceResponse(ex.getMessage(), false, '404');
        }
    }
    
    public static HttpResponse apiCallWithQueryString(String queryString, String service, String authCode, String authType){
        API_Config__mdt apiConfig = [Select Id,Body__c,Headers__c,Header_Values__c,Host__c,Method_Type__c,Timeout__c from API_Config__mdt Where DeveloperName=:service];
        HttpRequest request;
        HttpResponse response;
        String token;
        
        if(apiConfig!=null){
            request = new HttpRequest();
            setAuthorizationHeader(request, authCode, authType);
            
            string endPoint = apiConfig.Host__c;
            if (String.isNotBlank(queryString))
                endPoint = endPoint + (queryString.substring(0,1) != '?' ? '?' : '') + queryString;
            request.setEndpoint(endPoint);
            request.setMethod(apiConfig.Method_Type__c);
            setHeaders(request, apiConfig.Headers__c, apiConfig.Header_Values__c);
            
            if(String.isNotBlank(apiConfig.Body__c)){
                request.setBody(apiConfig.Body__c);
            }
            response = new Http().send(request);
        }
        return response;
    }
    
    public static String authToken(String authType){
        API_Config__mdt apiConfig = [Select Id,Body__c,Headers__c,Header_Values__c,Host__c,Method_Type__c,Timeout__c from API_Config__mdt Where DeveloperName=:authType];
        HttpRequest request;
        List<String> headers = new List<String>();
        List<String> headerValues = new List<String>();
        HttpResponse response;
        String token;
        
        if(apiConfig!=null){
            request = new HttpRequest();
            request.setEndpoint(apiConfig.Host__c);
            request.setMethod(apiConfig.Method_Type__c);
            setHeaders(request, apiConfig.Headers__c, apiConfig.Header_Values__c);
            
            if(String.isNotBlank(apiConfig.Body__c)){
                request.setBody(apiConfig.Body__c);
            }
            response = new Http().send(request);
            Map<String,Object> result = (Map<String,Object>)JSON.deserializeUntyped(response.getBody());
            token = string.valueOf(result.get('access_token'));
        }
        return token;
    }
    
    private static void setAuthorizationHeader(HttpRequest request, String authCode, String authType) {
        if(String.isNotBlank(authCode)) {
            request.setHeader('Authorization', 'Bearer ' + authCode);
        } else if(String.isNotBlank(authType)) {
            String token;
            token = authToken(authType);
            if(String.isNotBlank(token)) {
                request.setHeader('Authorization', 'Bearer ' + token);
            }
        }
    }
    
    private static void setHeaders(HttpRequest request, string headerKeys, string headerValues) {
        if (String.isNotBlank(headerKeys) && String.isNotBlank(headerValues)) {
            List<String> headerList = new List<String>();
            List<String> headerValueList = new List<String>();
            
            headerList = headerKeys.split(';');
            headerValueList = headerValues.split(';');
            
            for(Integer i=0; i<headerList.size();i++) {
                request.setHeader(headerList[i], headerValueList[i] );
            }
        }
    }
    
    public static webServiceResponse submitRequest(String body, String serviceName, String authCode, String authType){
        if(String.isNotBlank(body)) {
            APIHandlerRequest request = new APIHandlerRequest();
            request.authCode = authCode;
            request.authType = authType;
            request.body = body;
            request.service = serviceName;
            webServiceResponse res = apiCall(request);
            return res;
        }
        return null;
    }
}