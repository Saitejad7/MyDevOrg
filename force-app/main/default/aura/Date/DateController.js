({
doInit : function(component, event, helper) {             
        let day;
        switch (new Date().getDay()) {
            case 0,1,2:
                day = 3;
                break;
            case 3,4:
            case 5:
                day = 5;
                break;
            case 6:
                day = 4;
        }
        let todayValue = new Date().getDate();
        let futureValue = new Date(new Date().setDate(todayValue+day));
        let dd = new Date(futureValue).getDate();
        let mm = new Date(futureValue).getMonth()+1;
        let yyyy = new Date(futureValue).getFullYear();
        let minDate = `${yyyy}-${mm}-${dd}`;
        component.set("v.todayDate", minDate);
    }
})


/**({
    doInit : function(component, event, helper) {             
        var today = new Date();
        var dd = String(today.getDate() + 2);
        var mm = String(today.getMonth() + 1);
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        component.set("v.todayDate", today);
    },
})**/

/**({ 
    handleChange: function (cmp, evt) {
        //let  = cmp.find("myinput").value;
        let dateValue = cmp.get("v.dateValue");
        let todayValue = new Date().getDate();
        let futureValue = new Date(new Date().setDate(todayValue+2));
        if(new Date(dateValue) < new Date(futureValue)) {
           //throw custom error
        }
    }
 })	**/