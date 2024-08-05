({
    getInvestmentData: function(component){
        let action = component.get("c.getInvestRecords");
        action.setParams({
            "recId": component.get("v.recordId")
        });
        console.log(' action params ' + JSON.stringify(action.getParams()));
        action.setCallback(this, $A.getCallback(function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let investFunds = response.getReturnValue();
                component.set("v.investData", investFunds);
                console.log(' JSON format app ' + JSON.stringify(investFunds));
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
    
    getInvestmentFunds: function (component, event, helper) {
        let action = component.get("c.getInvestmentFundsRequestObject");
        action.setParams({ });
        action.setCallback(this, $A.getCallback(function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let investFundsData = response.getReturnValue();
                component.set("v.data", investFundsData);
               // console.log(' JSON format getInvestmentFundsRequestObject ' + JSON.stringify(investFundsData));
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
});