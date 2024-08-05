({
    loadOptions : function(component, event, helper) {
        let action = component.get("c.investmentWrapperData");
        action.setParams({});
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                const inves = response.getReturnValue();
                console.log('inves Response ' +JSON.stringify(inves));     
                component.set("v.invests", inves);
            } else if (status === "INCOMPLETE") {
                console.log("No response from server or client is offline.")
            } else if (status === "ERROR") {
                console.log("Error: " + errorMessage);
            }
        });
        $A.enqueueAction(action);
    }, 
  
    saveData: function(component, event, helper, selectedRecords){
        let action = component.get("c.saveSelectedRecords");
        action.setParams({'body': JSON.stringify(selectedRecords)});
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                const inves = response.getReturnValue();
                console.log('inves Response ' + inves);  
            } else if (status === "INCOMPLETE") {
                console.log("No response from server or client is offline.")
            } else if (status === "ERROR") {
                console.log("Error: " + errorMessage);
            }
        });
        $A.enqueueAction(action);
    }
})