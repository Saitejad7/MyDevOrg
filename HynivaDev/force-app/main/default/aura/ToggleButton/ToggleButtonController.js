({
    getButtonValue:function(component,event,helper){
      //var checkCmp = component.find("chkbox").get("v.value");
        //component.set("v.chkboxvalue",checkCmp);
        helper.mahesh(component,event);
    },
    doInit: function (component, event, helper) {
        
           // helper.setupDataTable(component);
                    helper.getCountries(component);

    },
 })