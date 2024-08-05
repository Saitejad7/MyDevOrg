({
    fetchAcc : function(component, event, helper) {
        helper.fetchAccHelper(component, event, helper);
    },
    openModel: function(component, event, helper) {
        component.set("v.isOpen", true);
    },
    
    closeModel: function(component, event, helper) { 
        component.set("v.isOpen", false);
    },
    
})