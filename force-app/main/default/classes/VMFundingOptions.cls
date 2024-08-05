public class VMFundingOptions {
	@AuraEnabled
    public static List<VMFundingOptionsWrapper> fundingOptions(){
        try{
            String json = '['+
		'    {'+
		'        \"category\": \"account\",'+
		'        \"datakey\": \"fund_optionsv1\",'+
		'        \"datavalue\": {'+
		'            \"value\": ['+
		'                {'+
		'                    \"value\": \"Initial\",'+
		'                    \"key\": \"init\"'+
		'                },'+
		'                {'+
		'                    \"value\": \"Initial and Monthly\",'+
		'                    \"key\": \"init_mon\"'+
		'                }'+
		'            ],'+
		'            \"key\": \"fund_optionsv1\"'+
		'        }'+
		'    }'+
		']';
            List<VMFundingOptionsWrapper> responseWrapper = VMFundingOptionsWrapper.parse(json);
            
            //System.debug('Records are:'+ responseWrapper);
           return responseWrapper;
        } catch(Exception ex){
            System.debug('Error occured while fetching Recurring Start date' + ex);
        }
        return null;
    }
}