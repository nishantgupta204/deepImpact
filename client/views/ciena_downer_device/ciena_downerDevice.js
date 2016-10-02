Template.CienaDownerDevice.rendered = function() {
	
};

Template.CienaDownerDevice.events({
      'click .commission-device':function(event, template) {
        var device = Session.get("device");
        alert(device)
    	 Meteor.call("mdso_commissionCienaDevice", device.id, function (error, result) {
            if (result) {
              Router.go('ciena_downerDevices');
            }
      });
    }
});

Template.CienaDownerDevice.helpers({
    'device': function() {
    return Session.get("device");
  }
});

Template.CienaDownerDevice.created = function () {

};
