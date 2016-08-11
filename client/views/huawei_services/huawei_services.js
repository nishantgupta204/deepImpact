Template.HuaweiServices.rendered = function() {
	Session.set('services', {});
};

Template.HuaweiServices.events({
	
});

Template.HuaweiServices.helpers({
    'xvcProduct': function() {
    return Session.get("xvcProduct");
  },
    'services': function() {
    return Session.get("services");
  }
});

Template.HuaweiServices.created = function () {
	Meteor.call("mdso_getProductID", "rahuawei.resourceTypes.XvcFragment", function (error, result) {
    if (result) {
      Session.set('xvcProduct', result);
      Meteor.call("mdso_getProducts", result.id, function (error, result2) {
        if (result2) {
          Session.set('services', result2);
        }
      });
    }
  });
};