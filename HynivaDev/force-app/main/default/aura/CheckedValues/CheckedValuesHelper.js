({
    getMockData: function(component, event) {
        console.log("Load mock data!");
        component.set("v.partnercolumns", [{
                label: "Name",
                fieldName: "Name",
                type: "text"
            },
            {
                label: "Status",
                fieldName: "status__c",
                type: "text"
            },
            {
                label: "Created Date",
                fieldName: "createdate__c",
                type: "date"
            }
        ]);
        component.set("v.partnerdata", [{
                Id: "a0319000001GtsjAAC",
                Name: "John Doe",
                status__c: "Active",
                createdate__c: "2005-01-01"
            },
            {
                Id: "a0319000001GtsjAAD",
                Name: "Mary Doe",
                status__c: "Active",
                createdate__c: "2005-02-10"
            }
        ]);

        var selectedRowsIds = ["a0319000001GtsjAAC"];

        // I was expecting the line to work
        //component.set("v.partnerSelectedRows", selectedRowsIds);

        // Workaround to selectRows
        component = component.find("partnerTable");
        component.set("v.selectedRows", selectedRowsIds);

    }
})