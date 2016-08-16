Template.HuaweiServiceDetail.rendered = function() {
//	Session.set('serviceID', {});
};

Template.HuaweiServiceDetail.events({
    'click .service-delete':function(event, template) {
        alert(JSON.stringify(this))
        $('#serviceDeleteConfirmModal').modal('show');
    },
    'click .endpoint-remove':function(event, template) {
    	Meteor.call("mdso_removeEndpoint", this, function (error, result) {
    	   Router.go('huawei_services');
      });
    }
});

Template.HuaweiServiceDetail.helpers({
    'serviceID': function() {
    return Session.get("serviceID");
  },
     'service': function() {
    return Session.get("service");
  },
    orchStateIs: function(orchState){
    return this.orchState === orchState;
  },
});

Template.HuaweiServiceDetail.created = function () {
	Meteor.call("mdso_getServiceID", Session.get("serviceID").id,"rahuawei.resourceTypes.XvcFragment", function (error, result) {
    if (result) {
      Session.set('service', result);
    }
  });
};

Template.serviceDeleteConfirmModal.events({
  'click .__cancel': function(e, t) {
    Modal.hide();
  },

  'click .__delete': function(e, t) {
    var self = this;
    Meteor.call('cart.removeLineItem', {
      cartId: self.product.parent._id,
      lineItemId: self.product._id,
    }, function(err){
      Modal.hide();
      if(!err){
        toastr.success('Item removed.', 'Success');
        analytics.track('Deleted a cart line item');
      } else {
        toastr.error(err.message, 'Error removing item');
      }
    });
  },
});