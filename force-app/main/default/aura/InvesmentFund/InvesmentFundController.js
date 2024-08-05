({
    loadOptions : function(component, event, helper) {
        helper.loadOptions(component, event, helper);
    },
    
    handleToggleChanged : function(component, event, helper) {
        var divSelected = event.getSource().get("v.checked");
    },
    
    selectedRecordsIds: function(component, event, helper) {
        var allRecords = component.get("v.invests");
        var selectedRecords = [];
        for (var i = 0; i < allRecords.length; i++) {
            if (allRecords[i].isChecked) {
                selectedRecords.push(allRecords[i]);
            }
        }
        console.log(' selected records ' + JSON.stringify(selectedRecords));
        
        helper.saveData(component, event, helper, selectedRecords);
        
    },
    
    // this function automatic call by aura:waiting event  
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for display loading spinner 
        component.set("v.Spinner", true); 
    },
    
    // this function automatic call by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hide loading spinner    
        component.set("v.Spinner", false);
    }  
})