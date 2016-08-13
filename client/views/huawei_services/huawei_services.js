Template.HuaweiServices.rendered = function() {
	Session.set('services', {});
};

Template.HuaweiServices.events({
    'click .service-row':function(event, template) {
        Session.set('serviceID', this);
        Router.go('huawei_service_detail', {id : this.id});
    },
  'click .service-add': function(e) {
    e.preventDefault();
    $('#serviceModal').modal('show');
  }
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
      Meteor.call("mdso_getServicesUnique", result.id, function (error, result2) {
        if (result2) {
          Session.set('services', result2);
        }
      });
    }
  });
};