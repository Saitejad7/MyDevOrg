public class CustomListView {
        @AuraEnabled
        public static List <Fund_Account__c> fetchfundAccounts() {
            List<Fund_Account__c> accList = [SELECT Id, Fund_Number__c, Name, Fund_Type__c,
                                     Fund_Symbol__c from Fund_Account__c];
            //return list of accounts
            return accList;
        }
 }