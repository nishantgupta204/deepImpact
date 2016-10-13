Template.CienaServiceDetail.rendered = function () {
  Session.set('service', {});
};

Template.CienaServiceDetail.events({
  'click .service-delete': function (event, Ciena) {
    alert(JSON.stringify(this))
    $('#serviceDeleteConfirmModal').modal('show');
  },
  'click .endpoint-remove': function (event, Ciena) {
    Meteor.call("mdso_removeEndpoint", this, function (error, result) {
      Router.go('ciena_services');
    });
  }
});

Template.CienaServiceDetail.helpers({
  'serviceID': function () {
    return Session.get("serviceID");
  },
  'service': function () {
    return Session.get("service");
  },
  orchStateIs: function (orchState) {
    return this.orchState === orchState;
  },
});

Template.CienaServiceDetail.created = function () {
  var localserviceID = Session.get("serviceID")
  var service = new Object();
  Meteor.call("mdso_getResourcesByResourceTypeId",  "raciena6x.resourceTypes.XvcFragment", "&q=label:" + localserviceID.label, function (error, result) {
    if (result) {
      Session.set('service', result);
    }
  });
};

Template.serviceDeleteConfirmModal.events({
  'click .__cancel': function (e, t) {
    Modal.hide();
  },

  'click .__delete': function (e, t) {
    var self = this;
    Meteor.call('cart.removeLineItem', {
      cartId: self.product.parent._id,
      lineItemId: self.product._id,
    }, function (err) {
      Modal.hide();
      if (!err) {
        toastr.success('Item removed.', 'Success');
        analytics.track('Deleted a cart line item');
      } else {
        toastr.error(err.message, 'Error removing item');
      }
    });
  },
});
