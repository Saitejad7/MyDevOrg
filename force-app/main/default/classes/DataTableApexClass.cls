public class DataTableApexClass {
    @AuraEnabled    
    public static List < Fund_Account__c > fetchAccts() {
        return [ SELECT Fund_Number__c,Fund_Symbol__c, Name, Funding_Options__c,Minimum_Automatic_Investment__c, Initial_Invesment__c, RECURRING_START_DATE__c FROM Fund_Account__c LIMIT 100 ];      
    }    
    @AuraEnabled    
    public static boolean updateAccts( List < Fund_Account__c > updatedAccountList ) {   
        try {
            update updatedAccountList;  
            return true;
        } catch(Exception e) { 
            return false;           
        }            
    }        
}