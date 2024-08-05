public with sharing class CheckboxUpdateController {
    @AuraEnabled
    public static List<Contact> getData() {
        List<Contact> contacts = [SELECT Id, Name, Phone, Email, Checkbox__c FROM Contact LIMIT 10];
        return contacts;
    }
}