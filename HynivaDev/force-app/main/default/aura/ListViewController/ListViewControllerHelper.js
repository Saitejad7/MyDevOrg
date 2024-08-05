({
	accountData  : function(component, event, helper) {
        
        // Call apex method to get all the Accounts
        var action = component.get("c.fetchAccts");
        action.setParams({
            recId: component.get("v.recordId")
        });  
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
				
				var app = response.getReturnValue();
                component.set( 'v.mycolumns', [
                    {label: 'Name', fieldName: 'Name', type: 'text',sortable: true},
                    {label: 'Account Type', fieldName: 'Type', type: 'text',sortable: true}
                ]);
                
                component.set("v.acctList", app);
                //console.log('app', app);
            }else if (state === 'ERROR'){
                component.set("v.errors","Data Not Found");
            }
        });
        $A.enqueueAction(action);
    },
    
    marketsData  : function(component, event, helper) {
        
        // Call apex method to get all the Accounts
        var action = component.get("c.fetchMarketAcc");
        action.setParams({
            recId: component.get("v.recordId")
        });  
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {				
				var marketApp = response.getReturnValue();
                component.set( 'v.marketColumns', [
                    {label: 'Name', fieldName: 'Name', type: 'text',sortable: true},
                    {label: 'Account Type', fieldName: 'Type', type: 'text',sortable: true}
                ]);
                component.set("v.marketList", marketApp);
                //console.log('marketApp', marketApp);
            }else if (state === 'ERROR'){
                component.set("v.errors","Data Not Found");
            }
        });
        $A.enqueueAction(action);
    },
    
    educationData  : function(component, event, helper) {
        
        // Call apex method to get all the Accounts
        var action = component.get("c.fetchEducationAcc");
        action.setParams({
            recId: component.get("v.recordId")
        });  
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {				
				var educationApp = response.getReturnValue();
                //console.log('educationApp', educationApp);
                component.set( 'v.educationColumns', [
                    {label: 'Name', fieldName: 'Name', type: 'text',sortable: true},
                    {label: 'Account Type', fieldName: 'Type', type: 'text',sortable: true}
                ]);
                component.set("v.educationList", educationApp);
                //console.log('marketApp', marketApp);
            }else if (state === 'ERROR'){
                component.set("v.errors","Data Not Found");
            }
        });
        $A.enqueueAction(action);
    },
    
    mutualData  : function(component, event, helper) {
        
        // Call apex method to get all the Accounts
        var action = component.get("c.fetchMutualAcc");
        action.setParams({
            recId: component.get("v.recordId")
        });  
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {				
				var mutualApp = response.getReturnValue();
                //console.log('educationApp', educationApp);
                component.set( 'v.mutualColumns', [
                    {label: 'Name', fieldName: 'Name', type: 'text',sortable: true},
                    {label: 'Account Type', fieldName: 'Type', type: 'text',sortable: true}
                ]);
                component.set("v.mutualList", mutualApp);
                //console.log('marketApp', marketApp);
            }else if (state === 'ERROR'){
                component.set("v.errors","Data Not Found");
            }
        });
        $A.enqueueAction(action);
    },
})