({
    startTimer : function(component, event, helper) {
        //var countDownDate = new Date(component.get("v.endTime"));
		//var countDownDate;
        var minutesToAdd=10;
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + minutesToAdd*60000);
        // Update the count down every 1 second
        var timer = setInterval(function() {
         
            // Get todays date and time
            var now = new Date().getTime();
         
            // Find the distance between now and the count down date
            var distance = futureDate - now;
         
            // Time calculations for days, hours, minutes and seconds
            //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
         
            // Display the result in the element with id="demo"
            var timeLeft = minutes + "m " + seconds + "s ";
            component.set("v.timeLeft", timeLeft);
        }, 1000);
    },
    
    handleStopClick : function(component) {
        
    },
    handleResetClick : function(component) {
        var stoptime = component.get("v.timeLeft");
        component.set("v.timeLeft",stoptime);
    }
})