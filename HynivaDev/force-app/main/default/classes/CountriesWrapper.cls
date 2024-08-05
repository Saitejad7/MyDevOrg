public class CountriesWrapper {
    
    @AuraEnabled
    public List<String> animals;
    
    public static CountriesWrapper parse(String json) {
        return (CountriesWrapper) System.JSON.deserialize(json, CountriesWrapper.class);
    }
}