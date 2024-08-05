public class DocumentCenterWrapper {
    
    public class Data {
        @AuraEnabled
        public String fileName;
        @AuraEnabled
        public String eSignName;
        @AuraEnabled
        public String description;
        @AuraEnabled
        public String title;
        @AuraEnabled
        public String alternateDocumentId;
        @AuraEnabled
        public String alternateDocumentLink;
        @AuraEnabled
        public String clientType;
        @AuraEnabled
        public String templateInstance;
        @AuraEnabled
        public String docCategory;
        @AuraEnabled
        public String tag;
        @AuraEnabled
        public String contentType;
        @AuraEnabled
        public String productType;
        @AuraEnabled
        public String expirationDate;
        @AuraEnabled
        public String usaaMemberId;
        @AuraEnabled
        public String formId;
        @AuraEnabled
        public String creator;
        @AuraEnabled
        public String accountDescriptor;
        @AuraEnabled
        public String destDetails;
        @AuraEnabled
        public String accountType;
        @AuraEnabled
        public String usaaReceivedDate;
        @AuraEnabled
        public String accountNumber;
        @AuraEnabled
        public String docSubCategory;
        @AuraEnabled
        public String documentSource;
        @AuraEnabled
        public String eSignDate;
        @AuraEnabled
        public String createdDate;
        @AuraEnabled
        public String viewable;
        @AuraEnabled
        public String returnable;
        @AuraEnabled
        public String vcmTemplate;
        @AuraEnabled
        public String versionLabel;
        @AuraEnabled
        public String eSignRequired;
        @AuraEnabled
        public String additionalParameters;
        @AuraEnabled
        public String usaaFormId;
        @AuraEnabled
        public String accountTypeGroup;
        @AuraEnabled
        public String nodeId;
        @AuraEnabled
        public String dctmId;
        @AuraEnabled
        public String entity;
    }
    @AuraEnabled
    public String code;
    @AuraEnabled
    public String message;
    @AuraEnabled
    public List<Data> data;
    @AuraEnabled
    public List<String> accounts;
    
    
    public static DocumentCenterWrapper parse(String json) {
        return (DocumentCenterWrapper) System.JSON.deserialize(json, DocumentCenterWrapper.class);
    }
}