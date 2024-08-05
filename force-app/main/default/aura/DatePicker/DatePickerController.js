({
	runScripts : function(component, event, helper) {
        $(document).ready(function(){ 
            $( "#mydatepicker" ).datepicker({
                beforeShowDay: function(date) {
                    var today = new Date();
                    if(date > today){
                        return [true];
                    }
                    else{
                        return [false];
                    }	 
                },
            });           
        });
    },
    
    getDate : function(component,event,helper){
        var oDate = $('#mydatepicker').val();
        alert(oDate);
        
    } 
})