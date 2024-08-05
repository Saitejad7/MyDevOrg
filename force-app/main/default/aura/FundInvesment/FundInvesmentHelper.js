({
    fetchAccHelper : function(component, event, helper) {
        component.set('v.mycolumns', [
            {label: 'Fund Number', fieldName: 'Fund_Number__c', type: 'text'},
                {label: 'Fund Name', fieldName: 'Name', type: 'text'},
                {label: 'Fund Type', fieldName: 'Fund_Type__c', type: 'picklist '},
                {label: 'Fund Symbol', fieldName: 'Fund_Symbol__c', type: 'text '}  
            ]);
        var action = component.get("c.fetchfundAccounts");
        action.setParams({
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.acctList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
})