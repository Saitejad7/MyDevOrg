public class ListViewControllerData {
    
	@AuraEnabled 
    public static  List<Account>  fetchAccts(){
        List<Account> app = [SELECT  Name, Type FROM Account WHERE Type != ''];
        return app;
    }
    
    @AuraEnabled 
    public static  List<Account>  fetchMarketAcc(){
        List<Account> marketApp = [SELECT  Name, Type FROM Account WHERE Type = 'Customer - Channel'];
        return marketApp;
    }
    
    @AuraEnabled 
    public static  List<Account>  fetchEducationAcc(){
        List<Account> marketApp = [SELECT  Name, Type FROM Account WHERE Type = 'Customer - Direct'];
        return marketApp;
    }
    
    @AuraEnabled 
    public static  List<Account>  fetchMutualAcc(){
        List<Account> marketApp = [SELECT  Name, Type FROM Account WHERE Type = 'Channel Partner / Reseller'];
        return marketApp;
    }
}