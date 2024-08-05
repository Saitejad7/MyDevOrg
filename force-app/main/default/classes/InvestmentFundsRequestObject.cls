public class InvestmentFundsRequestObject {
    @AuraEnabled
    public String fundName {get; set;}
    @AuraEnabled
    public String symbol {get; set;}
    @AuraEnabled
    public String fundingOptions {get; set;}
    @AuraEnabled
    public String fundNumber {get; set;}
    @AuraEnabled
    public String nav  {get;set;} 
    @AuraEnabled
    public String lastNav {get;set;} 
    @AuraEnabled
    public String changeInNav {get;set;} 
    @AuraEnabled
    public String changeInNavPercentage {get;set;} 
    @AuraEnabled
    public String max52W {get;set;} 
    @AuraEnabled
    public String min52W {get;set;} 
    @AuraEnabled
    public String risk {get;set;} 
    @AuraEnabled
    public String initialInvestment {get;set;} 
    @AuraEnabled
    public String minimumAutomaticInvestment {get;set;} 
    @AuraEnabled
    public String minimumInitialMonthlyInvestment {get;set;} 
    @AuraEnabled
    public String fundType {get;set;} 
    @AuraEnabled
    public String unissuedShares {get;set;} 
    @AuraEnabled
    public String unissuedBalance {get;set;} 
    
    public static List<InvestmentFundsRequestObject> parse(String json) {
        return (List<InvestmentFundsRequestObject>) System.JSON.deserialize(json, List<InvestmentFundsRequestObject>.class);
    }
}