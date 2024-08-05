({
    init: function (component, event, helper) {
        component.set('v.recordId', component.get('v.recordId'));
        component.set('v.columns', [
            {label: 'Fund Number', fieldName: 'fundNumber', type: 'text', editable: false, typeAttributes: { required: true }},
            {label: 'Fund Name', fieldName: 'fundName', type: 'text', editable: false },
            {label: 'Fund Symbol', fieldName: 'symbol', type: 'text', editable: false, typeAttributes: { required: true } },
            {label: 'Funding Options', fieldName: 'Funding_Options__c', type: 'picklist', typeAttributes: {
                    placeholder: 'Choose rating', options: [
                        { label: 'Initial Investment', value: 'Initial_Investment__c' },
                        { label: 'minimum Initial Monthly Investment', value: 'Minimum_Initial_Monthly_Investment__c' },                        
                    ]                        
                }
            },
            {label: 'Initial Investment', fieldName: 'initialInvestment', type: 'currency', typeAttributes: { currencyCode: 'USD'}, editable: true},
            {label: 'Monthly Recurring Amount', fieldName: 'minimumAutomaticInvestment', type: 'currency', typeAttributes: { currencyCode: 'USD'}, editable: true },
                        
            {
                label: 'Recurring Start Date', fieldName: 'closeDate', type: 'date', editable: true,
                typeAttributes: {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',                    
                }
            }
        ]);
        
        helper.getInvestmentFunds(component, event, helper);
        helper.getInvestmentData(component, event, helper);
       
        
    },

    handleCancelEdition: function (cmp) {
        // do nothing for now...
    },
    selectRow: function (component, event, helper) {
        var selectedRows = event.getParam("selectedRows");
        console.log('selectedRow: ' + JSON.stringify(selectedRows));
    },
    // this function automatic call by aura:waiting event  
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for display loading spinner 
       // component.set("v.Spinner", true); 
    },
    
    // this function automatic call by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hide loading spinner    
        //component.set("v.Spinner", false);
    },
    
    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');        
        switch (action.name) {
            case 'Edit':
                helper.editRecord(cmp, row);
                break;
            case 'View':
                helper.viewRecord(cmp, row);
                break;
            case 'Delete':
                helper.deleteRecord(cmp, row);
                break;
            default:
                helper.viewRecord(cmp,row);
                break;
        }
    },
    
    handleSaveEdition: function (component, event, helper) {
        var draftValues = event.getParam('draftValues');
        var selectedRows = event.getParam("selectedRows");
        console.log(selectedRows);
        var action = component.get("c.updateInvestmentFunds");
        action.setParams({
            "funds" : draftValues,
            "recordId": component.get('v.recordId')
        });
        console.log(' Action params ' + JSON.stringify(action.getParams()));
        action.setCallback(this, function(response) {
            var state = response.getState();
            $A.get('e.force:refreshView').fire();
        });
        $A.enqueueAction(action);
    },
});