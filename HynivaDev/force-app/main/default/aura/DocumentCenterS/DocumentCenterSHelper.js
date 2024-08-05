({
    setupDataTable: function (component) {
        component.set('v.columns', [
            {label: 'Document Name', fieldName: 'title', type: 'text', wrapText: true, className: 'dt-center'},
            {label: 'Document Date', fieldName: 'usaaReceivedDate', type: 'text', sortable: true, className: 'dt-center',
            cellAttributes: { alignment: 'left' }},
            {label: 'Category', fieldName: 'docCategory',  type: 'text', sortable: true,
            cellAttributes: { alignment: 'left' }},
            {label: 'Account', fieldName: 'accountDescriptor',  type: 'text', sortable: true, cellAttributes: { alignment: 'left' }},
            {label: 'Download', type: "button", typeAttributes: {
                label: 'Open',
                name: 'Open',
                title: 'Open',
                disabled: false,
                iconName: 'utility:opened_folder',
                value: 'alternateDocumentId',
                iconPosition: 'left'
            }},
        ]);
    },
 
    getData: function (component) {
        return this.callAction(component)
            .then(
                $A.getCallback(docs => {
                    component.set('v.allData', docs.data);
            		this.prepareAccounts(component, docs.accounts);
                    component.set('v.filteredData', docs.data);
                    this.preparePagination(component, docs.data);
                })
            )
            .catch(
                $A.getCallback(errors => {
                    if (errors && errors.length > 0) {
                        $A.get("e.force:showToast")
                            .setParams({
                                message: errors[0].message != null ? errors[0].message : errors[0],
                                type: "error"
                            })
                            .fire();
                    }
                })
            );
    },
 
    showSpinner: function(component, event, helper) {
        let spinner = component.find("mySpinner");
        $A.util.removeClass(spinner, "slds-hide");
    },
    
    hideSpinner: function(component, event, helper){
        let spinner = component.find("mySpinner");
        $A.util.addClass(spinner, "slds-hide");
    },
    
    callAction: function (component) {
        this.showSpinner(component);
        return new Promise(
            $A.getCallback((resolve, reject) => {
                const action = component.get("c.documentCenterWrapperData");
                action.setParams({'body': JSON.stringify(this.getParameters(component))});
                action.setCallback(this, response => {
                    this.hideSpinner(component);
                    const state = response.getState();
                    if (state === "SUCCESS") {
                        return resolve(response.getReturnValue());
                    } else if (state === "ERROR") {
                        return reject(response.getError());
                    } else {
                    	return null;
                    }    
                });
                $A.enqueueAction(action);
            })
        );
    },
        
    getParameters: function(component) { 
        let year = component.find('yearId').get('v.value');
        return {
            'docCategory': 'all',
            'dateFrom': year+'-01-01',
            'dateTo': year+'-12-31'
        };
    },    
 
    preparePagination: function (component, imagesRecords) {
        let countTotalPage = Math.ceil(imagesRecords.length/component.get("v.pageSize"));
        let totalPage = countTotalPage > 0 ? countTotalPage : 1;
        component.set("v.totalPages", totalPage);
        component.set("v.currentPageNumber", 1);
        this.setPageDataAsPerPagination(component);
    },
 
    setPageDataAsPerPagination: function(component) {
        let recordsCount = component.get("v.pageSize");
        let year = component.find('yearId').get('v.value');
        let data = [];
        let pageNumber = component.get("v.currentPageNumber");
        let pageSize = component.get("v.pageSize");
        let filteredData = component.get('v.filteredData');
        let x = (pageNumber - 1) * pageSize;
        for (; x < (pageNumber) * pageSize; x++){
            if (filteredData[x]) {
                data.push(filteredData[x]);
            }
        }
        component.set("v.tableData", data);
    },
 
    searchRecordsBySearchPhrase : function (component, filteredData) {
        if($A.util.isEmpty(filteredData)){
        	component.set('v.errors', 'No data found');
        } else{
            component.set('v.errors', null);
        }
        component.set("v.filteredData", filteredData);
        this.preparePagination(component, filteredData);
    },
        
    onKeyPresssearchRecordsBySearchPhrase: function (component) {
        let searchPhrase = component.get("v.searchPhrase");
        let allData = component.get("v.allData");
        let filteredData = allData.filter(record => record.title.includes(searchPhrase) 
                                          || record.docCategory.includes(searchPhrase)
                                          || record.accountDescriptor.includes(searchPhrase));
        
        this.searchRecordsBySearchPhrase(component, filteredData);
    },
        
    // Used to sort the 'Age' column
    sortBy: function(field, reverse, primer) {
        var key = primer ? function(x) { return primer(x[field]); } : function(x) { return x[field]; };
        return function(a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    },

    handleSort: function(component, event) {
        var sortedBy = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
		var allData = component.get('v.tableData');
        var cloneData = allData.slice(0);
        cloneData.sort((this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1)));
        component.set('v.tableData', cloneData);
        component.set('v.sortDirection', sortDirection);
        component.set('v.sortedBy', sortedBy);
    },
        
    getYearsData: function(component,event,helper){
        let items = [];
        for (let i = 0; i < 10; i++) {
            let year = (2021 - i);
            let item = {
                "label": year,
                "value": year.toString()
            };
            items.push(item);
        }
        component.set("v.years", items);
    },
        
    onChangeDocumentCategory: function (component, event, helper) {
        let searchPhrase = component.find('docuCategory').get('v.value');
        let allData = component.get("v.allData");
        let filteredData;
        if(searchPhrase == 'All') {
            filteredData = allData;
        } else {
                filteredData = allData.filter(record => record.docCategory.includes(searchPhrase));
        }
        this.searchRecordsBySearchPhrase(component, filteredData);
    },
        
    getDocumentById111: function (component, event) {
    	let action = component.get("c.getDocumentByDocId");
        let docId = event.getParam('row').alternateDocumentId;
        let queryParam = 'docid='+docId+'&download=true&source=broadridge&productid=YPCT&inline=true';
        action.setParams({"queryParam": queryParam});
        action.setCallback(this, function(response) {
        	let state = response.getState();
            if (state === "SUCCESS") {
            	const pdfData = response.getReturnValue();
                $A.createComponent("c:PDFViewer",{ "pdfData": pdfData},
                	function(pdfViewer, status, errorMessage){
                    	if (status === "SUCCESS") {
                            let pdfContainer = component.get("v.pdfContainer");
                            pdfContainer.push(pdfViewer);
                            component.set("v.pdfContainer", pdfContainer);                     
                       	} else if (status === "INCOMPLETE") {
                       		console.log("No response from server or client is offline.")
                       	} else if (status === "ERROR") {
                       		console.log("Error: " + errorMessage);
                       	}
                    }
                 );   
            }
           });
           $A.enqueueAction(action);
        },  
        
    prepareAccounts: function (component, accounts){
        var filteredAccounts = [];
        filteredAccounts.push('--Select--');
        for(var i =0 ; i < accounts.length ; i++){
        	filteredAccounts.push(accounts[i]);
        }
        component.set('v.filterByAccount', filteredAccounts);
    }, 
    
    onChangeAccounts: function (component, event, helper) {
        let filterAccount = component.find('filterByAccount').get('v.value');    
        let allData = component.get("v.allData");
        let filteredData;
        if(filterAccount == '--Select--') {
            filteredData = allData;
        } else {
            filteredData = allData.filter(record => record.accountDescriptor.includes(filterAccount));
        }
        this.searchRecordsBySearchPhrase(component, filteredData);
    },
        
        invetmentTestData : function (component, event, helper){
          let action = component.get("c.investmentWrapperData");
        action.setParams({});
        action.setCallback(this, function(response) {
        	let state = response.getState();
            if (state === "SUCCESS") {
                const inves = response.getReturnValue();
				console.log('inves Response ' +JSON.stringify(inves));                
            } else if (status === "INCOMPLETE") {
                console.log("No response from server or client is offline.")
            } else if (status === "ERROR") {
                console.log("Error: " + errorMessage);
            }
           });
           $A.enqueueAction(action);
        },
        
	getDocumentById: function (component, event) {
    	let action = component.get("c.getDocumentByDocId");
        let docId = event.getParam('row').alternateDocumentId;
        let queryParam = 'docid='+docId+'&download=true&source=broadridge&productid=YPCT&inline=true';
        action.setParams({"queryParam": queryParam});
        action.setCallback(this, function(response) {
        	let state = response.getState();
            if (state === "SUCCESS") {
                const pdfData = response.getReturnValue();
                component.set("v.pdfData", pdfData);                    
            } else if (status === "INCOMPLETE") {
                console.log("No response from server or client is offline.")
            } else if (status === "ERROR") {
                console.log("Error: " + errorMessage);
            }
           });
           $A.enqueueAction(action);
        },  
            
    loadpdf: function(component, event){
		try{
            let delay = 4000;
            setTimeout(function() {
                let pdfData = component.get('v.pdfData'); 
                let pdfjsframe = component.find('pdfFrame')
                if(typeof pdfData != 'undefined'){
                    pdfjsframe.getElement().contentWindow.postMessage(pdfData,'*');	
                }
            }, delay);
		}catch(e){
			console.log('Error: ' + e.message);
		}
	}
})