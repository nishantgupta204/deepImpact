Template.CienaServices.rendered = function() {

};

Template.CienaServices.created = function () {
	Meteor.call("mdso_getProductsByName", "raciena6x.resourceTypes.XvcFragment", function (error, result) {
    if (result) {
      Session.set('services', result);
    }
  });
};

Template.CienaServices.events({
	'click .service-row':function(event, template) {
			Session.set('serviceID', this);
			Router.go('ciena_service_detail', {id : this.label});
	}

});

Template.CienaServices.helpers({

});

Template.CienaServices.helpers({
    'services': function() {
    return Session.get("services");
  }
});
