public class InvestmentWrapper {
    
    @AuraEnabled
    public String fundName;
    @AuraEnabled
    public String symbol;
    @AuraEnabled
    public String fundNumber;
    @AuraEnabled
    public String fundOptions;
    @AuraEnabled
    public String nav;
    @AuraEnabled
    public String lastNav;
    @AuraEnabled
    public String changeInNav;
    @AuraEnabled
    public String changeInNavPercentage;
    @AuraEnabled
    public String max52W;
    @AuraEnabled
    public String min52W;
    @AuraEnabled
    public String risk;
    @AuraEnabled
    public String initialInvestment;
    @AuraEnabled
    public String minimumAutomaticInvestment;
    @AuraEnabled
    public String minimumInitialMonthlyInvestment;
    @AuraEnabled
    public String fundType;
    @AuraEnabled
    public String unissuedShares;
    @AuraEnabled
    public String unissuedBalance;
    
    Transient boolean isChecked;
    
    
    public static List<InvestmentWrapper> parse(String json) {
        return (List<InvestmentWrapper>) System.JSON.deserialize(json, List<InvestmentWrapper>.class);
    }
}