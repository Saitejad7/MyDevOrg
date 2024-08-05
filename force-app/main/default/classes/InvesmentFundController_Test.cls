@isTest
private class InvesmentFundController_Test{
  @testSetup
  static void setupTestData(){
    test.startTest();
    Fund_Account__c fund_account_Obj = new Fund_Account__c(Name = 'Name596', Fund_Symbol__c = 'Fund_171', Fund_Number__c = 'Fund_764', Initial_Invesment__c = 14, Minimum_Automatic_Investment__c = 15, Minimum_Initial_Monthly_Investment__c = 16, Fund_Type__c = 'Index', changeInNav__c = 18, Nav__c = 19, changeInNavPercentage__c = 20, max52W__c = 21, min52W__c = 22, unissuedBalance__c = 23, unissuedShares__c = 24, lastNav__c = 25, risk__c = 'risk__c991', Funding_Options__c = 'Initial Investment', RECURRING_START_DATE__c = Date.today());
    Insert fund_account_Obj; 
    test.stopTest();
  }
  static testMethod void test_investmentWrapperData_UseCase1(){
    List<Fund_Account__c> fund_account_Obj  =  [SELECT Name,Fund_Symbol__c,Fund_Number__c,Initial_Invesment__c,Minimum_Automatic_Investment__c,Minimum_Initial_Monthly_Investment__c,Fund_Type__c,changeInNav__c,Nav__c,changeInNavPercentage__c,max52W__c,min52W__c,unissuedBalance__c,unissuedShares__c,lastNav__c,risk__c,Funding_Options__c,RECURRING_START_DATE__c from Fund_Account__c];
    System.assertEquals(true,fund_account_Obj.size()>0);
    InvesmentFundController obj01 = new InvesmentFundController();
    InvesmentFundController.investmentWrapperData();
  }
  static testMethod void test_saveSelectedRecords_UseCase1(){
    List<Fund_Account__c> fund_account_Obj  =  [SELECT Name,Fund_Symbol__c,Fund_Number__c,Initial_Invesment__c,Minimum_Automatic_Investment__c,Minimum_Initial_Monthly_Investment__c,Fund_Type__c,changeInNav__c,Nav__c,changeInNavPercentage__c,max52W__c,min52W__c,unissuedBalance__c,unissuedShares__c,lastNav__c,risk__c,Funding_Options__c,RECURRING_START_DATE__c from Fund_Account__c];
    System.assertEquals(true,fund_account_Obj.size()>0);
    InvesmentFundController obj01 = new InvesmentFundController();
    InvesmentFundController.saveSelectedRecords('test data');
  }
}