Template.Huawei.rendered = function() {
	debugger
};

Template.Huawei.events({
	
});

Template.Huawei.helpers({
	  'domain': function() {
    return Session.get("domain");
  },
	  statusIs: function(operationMode){
    return this.operationMode === operationMode;
  }
});

Template.Huawei.created = function () {
  debugger
	Meteor.call("mdso_getDomain", "EAN", function (error, result) {
    if (result) {
      Session.set('domain', result);
    }
  });
};

Template.HuaweiHuaweiDevices.rendered = function() {
	
};

Template.HuaweiHuaweiDevices.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("huawei_devices", {});
	}
	
});

Template.HuaweiHuaweiDevices.helpers({
	
});

Template.HuaweiHuaweiServices.rendered = function() {
	
};

Template.HuaweiHuaweiServices.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("huawei_services", {});
	}
	
});

Template.HuaweiHuaweiServices.helpers({
	
});
