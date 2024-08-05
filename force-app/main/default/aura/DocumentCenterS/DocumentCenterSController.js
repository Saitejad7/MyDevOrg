({
    doInit: function (component, event, helper) {
        helper.getYearsData(component, event, helper);
        setTimeout(function(){
            helper.setupDataTable(component);
        }, 500);
        setTimeout(function(){
            helper.getData(component, event, helper);
        }, 500);
    },
    
    
    test: function (component, event, helper){
        helper.getYearsData(component, event, helper);
        setTimeout(function(){
            helper.setupDataTable(component);
        }, 500);
        setTimeout(function(){
            helper.getData(component, event, helper);
        }, 500);
       
    },
    getData: function(component, event, helper) {
        helper.getData(component, event, helper);
    },
    
    onNext: function(component, event, helper) {        
        let pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber + 1);
        helper.setPageDataAsPerPagination(component);
    },
    
    onPrev: function(component, event, helper) {        
        let pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber - 1);
        helper.setPageDataAsPerPagination(component);
    },
    
    onFirst: function(component, event, helper) {        
        component.set("v.currentPageNumber", 1);
        helper.setPageDataAsPerPagination(component);
    },
    
    onLast: function(component, event, helper) {        
        component.set("v.currentPageNumber", component.get("v.totalPages"));
        helper.setPageDataAsPerPagination(component);
    },
    
    onPageSizeChange: function(component, event, helper) {        
        helper.preparePagination(component, component.get('v.filteredData'));
    },
    
    onChangeSearchPhrase : function (component, event, helper) {
        if ($A.util.isEmpty(component.get("v.searchPhrase"))) {
            let allData = component.get("v.allData");
            component.set("v.filteredData", allData);
            helper.preparePagination(component, allData);
        }
    },
    
    onKeyPresssearchRecordsBySearchPhrase: function (component, event, helper) {
        helper.onKeyPresssearchRecordsBySearchPhrase(component, event, helper);
    },
    
    handleSearch : function (component, event, helper) {
        helper.searchRecordsBySearchPhrase(component);
    },
    
    handleSort: function(component, event, helper) {
        helper.handleSort(component, event);
    },
    
    onChangeDocumentCategory: function (component, event, helper) {
        helper.onChangeDocumentCategory(component, event, helper);
    },
    
    // function automatic called by aura:waiting event  
    showSpinner: function(component, event, helper) {
        helper.showSpinner(component, event, helper);
    },
    
    // function automatic called by aura:doneWaiting event 
    hideSpinner: function(component, event, helper){
        helper.hideSpinner(component, event, helper);
    },
    
    rowAction: function(component, event, helper) {
        let actionName = event.getParam('action').name;
        if (actionName == 'Open') {
            component.set("v.isModalOpen", true);
            helper.getDocumentById(component, event);
        }
    },
    
    closeModel: function(component, event, helper) {
        component.set("v.isModalOpen", false);
    },
     
    onChangeAccounts: function (component, event, helper) {
        helper.onChangeAccounts(component, event, helper);
    },

    loadpdf : function(component, event, helper) {
       helper.loadpdf(component,event);
	},
    
    handleShowModal: function(component, evt, helper) {
        var modalBody;
        $A.createComponent("c:modalContent", {},
           function(content, status) {
               if (status === "SUCCESS") {
                   modalBody = content;
                   component.find('overlayLib').showCustomModal({
                       header: "Application Confirmation",
                       body: modalBody,
                       showCloseButton: true,
                       cssClass: "mymodal",
                       closeCallback: function() {
                           alert('You closed the alert!');
                       }
                   })
               }
           });
    },
    
    handleShowPopover : function(component, event, helper) {
        component.find('overlayLib').showCustomPopover({
            body: "Popovers are positioned relative to a reference element",
            referenceSelector: ".popover1",
            cssClass: "popoverclass,cPopoverOpener"
        }).then(function (overlay) {
            component._overlay = overlay;
            setTimeout(function(){
                //close the popover after 3 seconds
                if (component._overlay) {
                    component._overlay.close();
                }
            }, 3000);
        });
    }
})