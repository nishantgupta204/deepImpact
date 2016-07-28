Template.HuaweiDevices.rendered = function() {
	
};

Template.HuaweiDevices.events({
	
});

Template.HuaweiDevices.helpers({
    'deviceProduct': function() {
    return Session.get("deviceProduct");
  },
    'devices': function() {
    return Session.get("devices");
  }
});

Template.HuaweiDevices.created = function () {
	Meteor.call("mdso_getProductDeviceID", "rahuawei", function (error, result) {
    if (result) {
      Session.set('deviceProduct', result);
      Meteor.call("mdso_getDevices", result.id, function (error, result2) {
        if (result2) {
          Session.set('devices', result2);
          
        }
      });
    }
  });
};
