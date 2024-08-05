public class AccountVerifyRequestWrapper {
    
    public String lastName {get; set;}
    
    public String emailId {get; set;}
    
    public String encryptedSSN {get; set;}
    
    public  String memberId {get; set;}
    
    public  String accountId {get; set;}
    
    public  String onlineId {get; set;}
    
    public String fullName {get; set;}
    
    public static AccountVerifyRequestWrapper parse(String json) {
        return (AccountVerifyRequestWrapper) System.JSON.deserialize(json, AccountVerifyRequestWrapper.class);
    }
}