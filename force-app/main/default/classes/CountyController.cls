public class CountyController {
    public static final String BASE_URL = 'https://restcountries.eu/rest/v2/name/eesti';
   @AuraEnabled
    public static CountriesWrapper getCountries(){
        try{
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            // If the request is successful, parse the JSON response.
            if (response.getStatusCode() == 200) {
                       CountriesWrapper www = CountriesWrapper.parse(response.getBody());
                return www;
            }
        } catch(Exception ex){
            System.debug('Error occured while fetching the documents list ' + ex);
        }
        return null;
    }
}