Template.CienaServices.rendered = function() {

};

Template.CienaServices.created = function () {
	Meteor.call("mdso_getProducts", "ciena6x.resourceTypes.XvcFragment", function (error, result) {
    if (result) {
      Session.set('services', result);
    }
  });
};

Template.CienaServices.events({

});

Template.CienaServices.helpers({

});
