public class VMFundingOptionsWrapper {
	
    @AuraEnabled
	public String category;
    @AuraEnabled
	public String datakey;
    @AuraEnabled
	public Datavalue datavalue;

	public class Datavalue {
        @AuraEnabled
		public List<Value> value;
        @AuraEnabled
		public String key;
	}

	public class Value {
        @AuraEnabled
		public String value;
        @AuraEnabled
		public String key;
	}

	
	public static List<VMFundingOptionsWrapper> parse(String json) {
		return (List<VMFundingOptionsWrapper>) System.JSON.deserialize(json, List<VMFundingOptionsWrapper>.class);
	}
}