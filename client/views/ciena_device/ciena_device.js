Template.CienaDevice.rendered = function() {
	
};

Template.CienaDevice.events({
    'click .delete-device':function(event, template) {
        var device = Session.get("device");
        alert(JSON.stringify(device))
    	 Meteor.call("mdso_deleteDevice", device.id, function (error, result) {
            if (result) {
              Router.go('ciena_devices');
            }
      });
    },
    'click .reset-device': function(event, template){
      var device = Session.get("device");
        // alert(JSON.stringify(device))

        Meteor.call("mdso_clicutthrough", "reset_device", device.providerResourceId, function(error, result) {
            if (result) {
                Router.go('ciena_devices');
            }
        });
    },
    'click .set-hostname': function(event, template){
      var device = Session.get("device");
        alert(JSON.stringify(device))

        Meteor.call("mdso_clicutthrough", "set_hostname", device.providerResourceId, function(error, result) {
            if (result) {
            }
        });
    }
});

Template.CienaDevice.helpers({
    'device': function() {
    return Session.get("device");
  }
});

Template.CienaDevice.created = function () {

};
