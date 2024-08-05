@RestResource(urlMapping='/customLabelService/*')
global class VMCustomLabelService {
    
    @HttpPatch
    global static webServiceResponse updateCustomLabel() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        
        try {
            // Parse the request body
            String requestBody = req.requestBody.toString();
            Map<String, Object> params = (Map<String, Object>) JSON.deserializeUntyped(requestBody);
            String labelName = (String) params.get('labelName');
            String newValue = (String) params.get('newValue');
            
            // Validate the input parameters
            if (String.isEmpty(labelName) || String.isEmpty(newValue)) {
                res.statusCode = 400;
                res.responseBody = Blob.valueOf('labelName and newValue are required.');
                return new webServiceResponse('labelName and newValue are required.', false, '400', null);
            }
            
            // Update the custom label
            updateCustomLabelMetadata(labelName, newValue);
            
            res.statusCode = 200;
            res.responseBody = Blob.valueOf('Custom label updated successfully.');
            return new webServiceResponse('Custom label updated successfully.', true, '200', null);
        } catch (Exception e) {
            res.statusCode = 500;
            res.responseBody = Blob.valueOf('Error: ' + e.getMessage());
            return new webServiceResponse('Error: ' + e.getMessage(), false, '500', null);
        }
    }
    
    @future(callout=true)
    public static void updateCustomLabelMetadata(String labelName, String newValue) {
        try {
            MetadataService.CustomLabel customLabel = new MetadataService.CustomLabel();
            customLabel.fullName = labelName;
            customLabel.value = newValue;
            
            MetadataService.MetadataPort service = new MetadataService.MetadataPort();
            service.SessionHeader = new MetadataService.SessionHeader_element();
            service.SessionHeader.sessionId = UserInfo.getSessionId();
            
            MetadataService.CustomLabel[] customLabels = new MetadataService.CustomLabel[] { customLabel };
                MetadataService.SaveResult[] results = service.updateMetadata(customLabels);
            
            for (MetadataService.SaveResult result : results) {
                if (!result.success) {
                    for (MetadataService.Error error : result.errors) {
                        System.debug('Error updating custom label: ' + error.message);
                    }
                } else {
                    System.debug('Successfully updated custom label: ' + result.fullName);
                }
            }
        } catch (Exception e) {
            System.debug('Exception in updateCustomLabelMetadata: ' + e.getMessage());
        }
    }
}