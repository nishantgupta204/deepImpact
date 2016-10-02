Template.CienaDevice.rendered = function() {
	
};

Template.CienaDevice.events({
    'click .delete-device':function(event, template) {
        var device = Session.get("device");
        alert(device)
    	 Meteor.call("mdso_deleteDevice", device.id, function (error, result) {
            if (result) {
              Router.go('ciena_devices');
            }
      });
    },
      'click .reset-device':function(event, template) {
        var device = Session.get("device");
        alert(device)
    	 Meteor.call("mdso_resetCienaDevice", device.id, function (error, result) {
            if (result) {
              Router.go('ciena_devices');
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
