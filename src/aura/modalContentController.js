({
    makeRequest : function(component, event, helper) {
        var action = component.get("c.service");
        var body_val = 
            "{\"inputs\" : [{\"emailAddresses\":\""+ component.get("v.emailAddresses")+"\",\"emailSubject\":\""+component.get("v.emailSubject")+"\",\"emailBody\":\""+component.get("v.emailBody")+"\"}]}";
        action.setParams({
            path: component.get("v.path"),
            method: component.get("v.method"),
            responseFormat: component.get("v.responseFormat"),
            bodyContent: body_val,
            bodyContentType: component.get("v.bodyContentType")
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            var resp  = JSON.parse(response.getReturnValue().body);
            if (state === "SUCCESS") {
                var appevent = $A.get("e.prao6308:closemodal");
                appevent.setParams({ "closemodalbool" : true });
                appevent.fire();
                $A.get("e.force:closeQuickAction").fire();
                var toastEvent = $A.get("e.force:showToast"); 
                if(resp[0]["isSuccess"] == true){
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "Email sent successfully."
                    });
                }
                else{               
                    toastEvent.setParams({
                        "title": resp[0]["errors"][0].statusCode,
                        "message": resp[0]["errors"][0].message
                    });                    
                }
                
                
                toastEvent.fire();               
            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            component.getEvent("restResponseEvent").setParams({
                response: response.getReturnValue()
            }).fire(); 
        });
        $A.enqueueAction(action);
    }
})