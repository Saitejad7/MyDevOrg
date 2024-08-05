({
    myAction : function(component, event, helper) {
        var action = component.get("c.getPicklistOptions");
        action.setCallback(this, function(result){
            if (component.isValid() && result.getState() === 'SUCCESS'){
                var options = [];
                var resultSet = result.getReturnValue();
                console.log(resultSet);
                for (var i = 0; i<resultSet.length; i++){
                    options.push({value: resultSet[i].value, label: resultSet[i].label});
                    if(resultSet[i].isDefault == true){
                       component.set("v.value", resultSet[i].value);
                    }
                }
                component.set("v.options", options);
            }
        });
        $A.enqueueAction(action);
    },
})