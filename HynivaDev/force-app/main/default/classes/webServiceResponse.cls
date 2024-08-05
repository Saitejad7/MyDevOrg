//Used as an Interface Adaptor Layer for most of the API's
global with sharing class webServiceResponse {
    
    private List < sObject > lstOfRecords {
        get;
        set;
    }
    
    private sObject responseObject {
        get;
        set;
    }
    public String body {
        get;
        set;
    }
    
    public String responseCode {
        get;
        set;
    }
    
    @TestVisible
    private Boolean isSuccess {
        get;
        set;
    }
    
    private String message {
        get;
        set;
    }
    
    //Used for returning Error messages for API execution exception
    public webServiceResponse(String message, Boolean isAPIFailure) {
       // this.responseCode = System.Label.VM_API_Failure_Response_Code;
        this.isSuccess = false;
        this.message = message;
    }
     //Used for returning Custom Success message for sObject return
    public webServiceResponse(String message, Boolean isCustomSuccess, String responseCode) {
        this.isSuccess = isCustomSuccess;
        this.responseCode = responseCode;
        this.message = message;
    }
    //Used for returning Custom Success message for sObject return
    //Ravi Theja Panem(HYNIVA)
    //TODO: Added extra param value for fix the Ambiguity issue, Once resolved this make it this a common method then remove the extra param value.
    public webServiceResponse(String message, Boolean isCustomSuccess, String responseCode, String responseObject, String responseError) {
        this.body = responseObject;
        this.isSuccess = isCustomSuccess;
        this.responseCode = responseCode;
        this.message = message;
    }
    //Used for returning Custom Success message for sObject return
    public webServiceResponse(String message, Boolean isCustomSuccess, String responseCode, sObject responseObject) {
        this.responseObject = responseObject;
        this.isSuccess = isCustomSuccess;
        this.responseCode = responseCode;
        this.message = message;
    }
    
    //Used for returning Error message for managed messages
    public webServiceResponse(String restServiceMetaDataName) {
        setPreConfguredResponseAttributes(restServiceMetaDataName);
    }
    
    //Used for returning Success message for sObject return
    public webServiceResponse(String restServiceMetaDataName, sObject responseObject) {
        this.responseObject = responseObject;
        setPreConfguredResponseAttributes(restServiceMetaDataName);
    }
    
    //Used for returning Success message for List < sObject > return
    public webServiceResponse(String restServiceMetaDataName, List < sObject > lstOfRecords) {
        this.lstOfRecords = lstOfRecords;
        setPreConfguredResponseAttributes(restServiceMetaDataName);
    }
    
    //Used for returning Success message for List < sObject > return
    public webServiceResponse(String restServiceMetaDataName, sObject responseObject, List < sObject > lstOfRecords) {
        this.lstOfRecords = lstOfRecords;
        this.responseObject = responseObject;
        setPreConfguredResponseAttributes(restServiceMetaDataName);
    }
    
    //Get pre-configured response values
    private void setPreConfguredResponseAttributes(String restServiceMetaDataName) {
        List < Rest_Response_Config__mdt > responseConfig = new List < Rest_Response_Config__mdt > ();
        
        if(Schema.sObjectType.Rest_Response_Config__mdt.isAccessible() && Schema.sObjectType.Rest_Response_Config__mdt.fields.Is_Success__c.isAccessible() &&
           Schema.sObjectType.Rest_Response_Config__mdt.fields.Status_Code__c.isAccessible() && Schema.sObjectType.Rest_Response_Config__mdt.fields.Status_Description__c.isAccessible() &&
           Schema.sObjectType.Rest_Response_Config__mdt.fields.MasterLabel.isAccessible()) 
        {
            responseConfig = [SELECT Id, Is_Success__c, Status_Code__c, Status_Description__c
                              FROM Rest_Response_Config__mdt WHERE MasterLabel =: restServiceMetaDataName
                             ];            
        }
        
        if (responseConfig.isEmpty())
            return;
        
        this.message = responseConfig[0].Status_Description__c;
        this.responseCode = responseConfig[0].Status_Code__c;
        this.isSuccess = responseConfig[0].Is_Success__c;
    }
}