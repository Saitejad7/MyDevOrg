({
    mahesh:function(component,event){
        var checkCmp = component.find("chkbox").get("v.value");
        component.set("v.chkboxvalue",checkCmp);
    },
    setupDataTable: function (component) {
        component.set('v.columns', [
            {label: 'Document Name', fieldName: 'title', type: 'text', wrapText: true, className: 'dt-center'},
            {label: 'Document Date', fieldName: 'usaaReceivedDate', type: 'text', sortable: true, className: 'dt-center',
             cellAttributes: { alignment: 'left' }},
            {label: 'Category', fieldName: 'docCategory',  type: 'text', sortable: true,
             cellAttributes: { alignment: 'left' }}
             ]);
            },
            getCountries: function (component, event) {
    let action = component.get("c.getCountries");
        action.setParams({});
        action.setCallback(this, function(response) {
        let state = response.getState();
            console.log('state'+state);
            if (state === "SUCCESS") {
            console.log('responsedata '+ JSON.stringify(response.getReturnValue()));
                component.set('v.data',response.getReturnValue());
            } else if (status === "INCOMPLETE") {
                console.log("No response from server or client is offline.")
            } else if (status === "ERROR") {
                console.log("Error: " + errorMessage);
            }
           });
           $A.enqueueAction(action);
        },  
})