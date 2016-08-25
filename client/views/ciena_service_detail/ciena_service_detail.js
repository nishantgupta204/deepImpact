Template.CienaServiceDetail.rendered = function() {

};

Template.CienaServiceDetail.events({
    'click .service-delete':function(event, Ciena) {
        alert(JSON.stringify(this))
        $('#serviceDeleteConfirmModal').modal('show');
    },
    'click .endpoint-remove':function(event, Ciena) {
    	Meteor.call("mdso_removeEndpoint", this, function (error, result) {
    	   Router.go('ciena_services');
      });
    }
});

Template.CienaServiceDetail.helpers({
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

Template.CienaServiceDetail.created = function () {
    var str = Iron.Location.get().path;
    var n = str.lastIndexOf('/');
    var sid = str.substring(n + 1);
    Session.set('serviceID',{"id":sid})
	Meteor.call("mdso_getServiceID", Session.get("serviceID").id,"raciena.resourceTypes.XvcFragment", function (error, result) {
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