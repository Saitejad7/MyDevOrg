@RestResource(urlMapping='/AccountDetails/*')
global with sharing class AccountDetailsService {

    @HttpGet
    global static AccountInfo getAccountDetails() {
        // Get the Account Id from the URL
        RestRequest req = RestContext.request;
        String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
        
        // Query the Account record
        Account accountRecord = [
            SELECT Id, Name, Phone, Website
            FROM Account
            WHERE Id = :accountId
            LIMIT 1
        ];
        
        // Create a custom object to return the desired fields
        AccountInfo accountInfo = new AccountInfo();
        accountInfo.Id = accountRecord.Id;
        accountInfo.Name = accountRecord.Name;
        accountInfo.Phone = accountRecord.Phone;
        accountInfo.Website = accountRecord.Website;
        
        return accountInfo;
    }
    
    // Inner class to structure the response
    global class AccountInfo {
        public String Id;
        public String Name;
        public String Phone;
        public String Website;
    }
}