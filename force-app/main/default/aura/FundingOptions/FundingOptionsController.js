({
	loadOptions : function(component, event, helper) {
        let action = component.get("c.fundingOptions");
        action.setParams({
            
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                const inves = response.getReturnValue();
                console.log('inves Response ' +JSON.stringify(inves));
                console.log('inves Data1 ' +inves[0].category);
                console.log('inves Data1 ' +inves[0].datavalue);
                component.set("v.invests", inves);
            } else if (status === "INCOMPLETE") {
                console.log("No response from server or client is offline.")
            } else if (status === "ERROR") {
                console.log("Error: " + errorMessage);
            }
        });
        $A.enqueueAction(action);
    },
})