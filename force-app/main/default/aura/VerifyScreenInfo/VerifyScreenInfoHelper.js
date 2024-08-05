({
	verifyScreenPopUp: function(component, event, helper) {
        component.set("v.Spinner", true);
        var action = component.get("c.verifyScreenDataInfo");
        action.setParams({
            //vcmId: component.get("v.vcmId"),
            //applicationId:component.get("v.appid")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var verifyData = response.getReturnValue();
                console.log('verifyData', verifyData);
                if(verifyData.responseCode == 3000){
                    let accType = verifyData.result.account.accountType;
                    let accountType = accType.replace(/[^a-zA-Z]/g, '').toUpperCase();
                    component.set('v.accountType', accountType);
                    
                    var empStatus = verifyData.result.employmentInfo.primary.status;
                    component.set('v.empStatus', empStatus);                
                    
                    // To show the Financial Information of Primary and Joint Annual Income (USD) and Net Worth (USD) in formatted Currency
                    const financialInfo = verifyData.result.financialInfo.primary;
                    const formatCurrency = (value) => parseInt(value.replace("$", "")).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
                    if(financialInfo.annualIncome != ''){
                        const financialAnnualIncome = `${formatCurrency(financialInfo.annualIncome.split("-")[0])}-${formatCurrency(financialInfo.annualIncome.split("-")[1])}`;
                        component.set('v.financialAnnualIncome', financialAnnualIncome);
                    } 
                    if(financialInfo.netWorth != ''){
                        const financialNetWorth = `${formatCurrency(financialInfo.netWorth.split("-")[0])}-${formatCurrency(financialInfo.netWorth.split("-")[1])}`;                
                        component.set('v.financialNetWorth', financialNetWorth);
                    }                             
                    
                    if(accountType == 'JTWROS'){
                        var jointEmpStatus = verifyData.result.employmentInfo.joint.status;
                        component.set('v.jointEmpStatus', jointEmpStatus);
                        
                        // To show the Financial Information of Primary and Joint Annual Income (USD) and Net Worth (USD) in formatted Currency
                        const financialInfoJoint = verifyData.result.financialInfo.joint;
                        const formatCurrencyJoint = (value) => parseInt(value.replace("$", "")).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
                        if(financialInfoJoint.annualIncome != ''){
                            const financialAnnualIncomeJoint = `${formatCurrencyJoint(financialInfoJoint.annualIncome.split("-")[0])}-${formatCurrencyJoint(financialInfoJoint.annualIncome.split("-")[1])}`;
                            component.set('v.financialAnnualIncomeJoint', financialAnnualIncomeJoint);
                        }
                        if(financialInfo.netWorth != ''){
                            const financialNetWorthJoint = `${formatCurrencyJoint(financialInfoJoint.netWorth.split("-")[0])}-${formatCurrencyJoint(financialInfoJoint.netWorth.split("-")[1])}`;
                            component.set('v.financialNetWorthJoint', financialNetWorthJoint);
                        }                                                            
                    }
                    
                    var includesIra = accountType.includes('IRA');
                    console.log('includesIra', includesIra);
                    component.set('v.includesIra', includesIra);                
                    if(includesIra){
                        var beneficiariesData = verifyData.result.beneficiaries.primary;
                        component.set('v.beneficiariesData', beneficiariesData);
                        var contingentData = verifyData.result.beneficiaries.contingent;
                        component.set('v.contingentData', contingentData);
                    }                    
                    
                    component.set('v.verifyData', verifyData);
                    console.log('verifyData', verifyData);
                } else{
                    component.set('v.showError', true);
                    component.set('v.diffResCode', 'API Failure')
                }
                component.set("v.Spinner", false);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.log('errors', errors[0].message);
            }
        });
        $A.enqueueAction(action);
    },
})