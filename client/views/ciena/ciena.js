Template.Ciena.rendered = function() {
	
};

Template.Ciena.events({
	
});

Template.Ciena.helpers({
    'domain': function() {
    return Session.get("domain");
  },
	  statusIs: function(operationMode){
    return this.operationMode === operationMode;
  }
});

Template.Ciena.created = function () {
    Session.set('domain', {});
    Meteor.call("mdso_getDomain", "Ciena6x", function (error, result) {
    if (result) {
      Session.set('domain', result);
    }
  });
};

Template.CienaCienaDevices.rendered = function() {
	
};

Template.CienaCienaDevices.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("ciena_devices", {});
	}
	
});

Template.CienaCienaDevices.helpers({
	
});

Template.CienaCienaServices.rendered = function() {
	
};

Template.CienaCienaServices.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("ciena_services", {});
	}
	
});

Template.CienaCienaServices.helpers({
	
});
