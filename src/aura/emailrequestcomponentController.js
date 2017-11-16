({
    handleShowModal: function(component, evt, helper) {
        var modalBody;
        $A.createComponent("prao6308:modalContent", {
        },
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   component.find('overlayLib').showCustomModal({
                                       header: "Send Email",
                                       body: modalBody, 
                                       showCloseButton: true,
                                       cssClass: "mymodal",
                                       closeCallback: function() {
                                       }
                                   }).then(function (overlay) {
                                       component.set('v.overlayPanel', overlay);
                                   });   
                               }
                               
                           });
    },
    handleComponentEventFired: function(component, evt, helper) {
        var overlayPanel = component.get('v.overlayPanel');
        if(component.isValid() && overlayPanel[0] != undefined){
            overlayPanel[0].close();
        }
    }
    
})