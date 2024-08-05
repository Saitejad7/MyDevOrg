public class CustomPicklistHandler {
    @AuraEnabled
    public static List<SelectOptionObj> getPicklistOptions() {
        List<SelectOptionObj> picklistOptions = new List<SelectOptionObj>();
        try {
            Schema.DescribeFieldResult fieldResult = Account.AccountSource.getDescribe(); 
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            SelectOptionObj option = null;
            for (Schema.PicklistEntry pickListVal : ple) {
                option = new SelectOptionObj(pickListVal.getLabel(), pickListVal.getValue(), pickListVal.isDefaultValue());
                picklistOptions.add(option);
            }
            
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        return picklistOptions;
    }
    public class SelectOptionObj {
        @AuraEnabled
        public String label { get; set; }
        @AuraEnabled
        public String value { get; set; }
        @AuraEnabled
        public Boolean isDefault {get; set;}
        
        public SelectOptionObj(String label, String val,Boolean isDefault) {
            this.label = label;
            this.value = val;
            this.isDefault = isDefault;
        }
    }
}