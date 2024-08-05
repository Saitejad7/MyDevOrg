({    
      
    onInit : function( component, event, helper ) {    
          
        component.set( 'v.mycolumns', [    
            {label: 'Fund Number', fieldName: 'Fund_Number__c', type: 'text'},
            {label: 'Fund Symbol', fieldName: 'Fund_Symbol__c', type: 'text'},
            {label: 'Fund Name', fieldName: 'Name', type: 'text'},
            {label: 'Funding Options', fieldName: 'Funding_Options__c', type: 'Picklist', editable:true},
            {label: 'Initial Invesment', fieldName: 'Initial_Invesment__c', type: 'currency', editable:true},
            {label: 'Minimum Initial Monthly Investment', fieldName: 'Minimum_Automatic_Investment__c', type: 'currency', editable:true},
            {label: 'RECURRING START DATE', fieldName: 'RECURRING_START_DATE__c', type: 'date', editable:true}
        ]);    
        helper.fetchAccounts(component);    
    }, 
    onSave : function( component, event, helper ) { 
        var updatedRecords = component.find( "acctTable" ).get( "v.draftValues" );  
        var action = component.get( "c.updateAccts" );  
        action.setParams({
            'updatedAccountList' : updatedRecords
        });  
        action.setCallback( this, function( response ) {
            var state = response.getState();   
            if ( state === "SUCCESS" ) {
                if ( response.getReturnValue() === true ) {  
                    helper.toastMsg( 'success', 'Records Saved Successfully.' );  
                    component.find( "acctTable" ).set( "v.draftValues", null );  
                } else {  
                    helper.toastMsg( 'error', 'Something went wrong. Contact your system administrator.' );     
                }  
            } else {    
                helper.toastMsg( 'error', 'Something went wrong. Contact your system administrator.' )    
            }  
        });  
        $A.enqueueAction( action );    
    }     
})