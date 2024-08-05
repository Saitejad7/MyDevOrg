@isTest
private class InvestmentFundsRequestObject_Test{
  @testSetup
  static void setupTestData(){
    test.startTest();
    Fund_Account__c fund_account_Obj = new Fund_Account__c(Name = 'Name206', Fund_Symbol__c = 'Fund_716', Fund_Number__c = 'Fund_363', Initial_Invesment__c = 14, Minimum_Automatic_Investment__c = 15, Minimum_Initial_Monthly_Investment__c = 16, Fund_Type__c = 'Index', changeInNav__c = 18, Nav__c = 19, changeInNavPercentage__c = 20, max52W__c = 21, min52W__c = 22, unissuedBalance__c = 23, unissuedShares__c = 24, lastNav__c = 25, risk__c = 'risk__c772', Funding_Options__c = 'Initial Investment', RECURRING_START_DATE__c = Date.today());
    Insert fund_account_Obj; 
    test.stopTest();
  }
  static testMethod void test_parse_UseCase1(){
    List<Fund_Account__c> fund_account_Obj  =  [SELECT Name,Fund_Symbol__c,Fund_Number__c,Initial_Invesment__c,Minimum_Automatic_Investment__c,Minimum_Initial_Monthly_Investment__c,Fund_Type__c,changeInNav__c,Nav__c,changeInNavPercentage__c,max52W__c,min52W__c,unissuedBalance__c,unissuedShares__c,lastNav__c,risk__c,Funding_Options__c,RECURRING_START_DATE__c from Fund_Account__c];
    System.assertEquals(true,fund_account_Obj.size()>0);
    InvestmentFundsRequestObject obj01 = new InvestmentFundsRequestObject();
    obj01.fundName = 'test data';
    obj01.symbol = 'test data';
    obj01.fundingOptions = 'test data';
    obj01.fundNumber = 'test data';
    obj01.nav = 'test data';
    obj01.lastNav = 'test data';
    obj01.changeInNav = 'test data';
    obj01.changeInNavPercentage = 'test data';
    obj01.max52W = 'test data';
    obj01.min52W = 'test data';
    obj01.risk = 'test data';
    obj01.initialInvestment = 'test data';
    obj01.minimumAutomaticInvestment = 'test data';
    obj01.minimumInitialMonthlyInvestment = 'test data';
    obj01.fundType = 'test data';
    obj01.unissuedShares = 'test data';
    obj01.unissuedBalance = 'test data';
    InvestmentFundsRequestObject.parse('test data');
  }
}