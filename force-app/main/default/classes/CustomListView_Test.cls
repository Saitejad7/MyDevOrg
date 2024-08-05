@isTest
private class CustomListView_Test{
  @testSetup
  static void setupTestData(){
    test.startTest();
    Fund_Account__c fund_account_Obj = new Fund_Account__c(Name = 'Name966', Fund_Symbol__c = 'Fund_237', Fund_Number__c = 'Fund_226', Fund_Type__c = 'Index');
    Insert fund_account_Obj; 
    test.stopTest();
  }
  static testMethod void test_fetchfundAccounts_UseCase1(){
    List<Fund_Account__c> fund_account_Obj  =  [SELECT Name,Fund_Symbol__c,Fund_Number__c,Fund_Type__c from Fund_Account__c];
    System.assertEquals(true,fund_account_Obj.size()>0);
    CustomListView obj01 = new CustomListView();
    CustomListView.fetchfundAccounts();
  }
}