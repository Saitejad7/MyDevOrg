({
    onInit : function( component, event, helper ) { 
        
        helper.accountData(component, event, helper);
        helper.marketsData(component, event, helper);
        helper.educationData(component, event, helper);
        helper.mutualData(component, event, helper);
    },
    
    onChange : function( component, event, helper ) { 
        var valueSelected = component.find('select').get('v.value');        
        //console.log('defaultValue', defaultValue);
        component.set('v.selectedValue', valueSelected)
    },
    
    handleClick : function( component, event, helper ) { 
        
    },
    
    handleSelect : function(component, event, helper) {
        // This will contain the index (position) of the selected lightning:menuItem
        
        var selectedMenuItemValue = event.getParam("value");
        component.set("v.selectedMenuItemValue", selectedMenuItemValue)
        //console.log('value', selectedMenuItemValue);                
    }, 
    
    filterClick : function(component, event, helper) {
        var showFilter = component.get('v.filter');
        console.log('filter', showFilter);
        if(showFilter == false){
            component.set('v.filter', false);
        } else {
            component.set('v.filter', true);
        }
        
        
    }
})