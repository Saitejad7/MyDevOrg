({
    doInit: function(component, event, helper) {
        var action = component.get("c.getData");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                component.set("v.data", data);
            } else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);

        var columns = [
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'phone'},
            {label: 'Email', fieldName: 'Email', type: 'email'}
        ];
        columns.unshift({label: 'Select', type: 'checkbox', fieldName: 'Checkbox__c'});
        component.set("v.columns", columns);
    },

    handleCheckboxChange: function (component, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        var data = component.get('v.data');

        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            row.isSelected = selectedRows.indexOf(row) >= 0;
        }

        component.set('v.data', data);
    }
})