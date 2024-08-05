trigger PractiseTrigger on Contact (before update) {
    Integer adminsum1 = 0;
    for(Contact c : trigger.new){
        if(c.Administrative_Compliance__c  != Trigger.oldMap.get(c.Id).Administrative_Compliance__c ) {
            if(c.Administrative_Compliance__c == 'Yes' || c.Administrative_Compliance__c == 'N/A'){                
                if (adminsum1 < 25) {
                    adminsum1 += 25;
                    c.Total_Points__c += adminsum1;
                }
                //c.Total_Points__c = c.Total_Points__c + 25; 
            }
            else if (c.Administrative_Compliance__c == 'No') {
                if (adminsum1 <= 25) {
                    adminsum1 -= 25;
                    c.Total_Points__c -= adminsum1;
                }
                //c.Total_Points__c -= 25;
            }
        }
        //c.Total_Points__c += adminsum1;
    }    
}