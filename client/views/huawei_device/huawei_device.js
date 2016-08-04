Template.HuaweiDevice.rendered = function() {
	
};

Template.HuaweiDevice.events({
    'click .delete-device':function(event, template) {
        var device = Session.get("device");
	 Meteor.call("mdso_deleteDevice", device.id, function (error, result) {
        if (result) {
          Router.go('huawei_devices');
        }
      });
        
    }
});

Template.HuaweiDevice.helpers({
    'device': function() {
    return Session.get("device");
  }
});

Template.HuaweiDevice.created = function () {

};
