Template.HuaweiServiceDetail.rendered = function() {
//	Session.set('serviceID', {});
};

Template.HuaweiServiceDetail.events({

});

Template.HuaweiServiceDetail.helpers({
    'serviceID': function() {
    return Session.get("serviceID");
  },
     'service': function() {
    return Session.get("service");
  }
});

Template.HuaweiServiceDetail.created = function () {
	Meteor.call("mdso_getServiceID", Session.get("serviceID").id,"rahuawei.resourceTypes.XvcFragment", function (error, result) {
    if (result) {
      Session.set('service', result);
    }
  });
};