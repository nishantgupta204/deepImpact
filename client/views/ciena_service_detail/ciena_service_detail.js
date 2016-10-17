Template.CienaServiceDetail.rendered = function () {
  Session.set('service', {});
};

Template.CienaServiceDetail.events({
  'click .services-delete': function (event, target) {
    alert(JSON.stringify(this))
    $('#serviceDeleteConfirmModal').modal('show');
  },
  'click .endpoint-remove': function (event, target) {
    var localservice = Session.get("service")
    delService = localservice[event.currentTarget.id]
    Meteor.call("mdso_removeEndpoint", delService, function (error, result) {
    });
  }
});

Template.CienaServiceDetail.helpers({
  'serviceID': function () {
    return Session.get("serviceID");
  },
  'service': function () {
    return Session.get("service");
  }
});

Template.CienaServiceDetail.created = function () {
  var localserviceID = Session.get("serviceID")
  Meteor.call("mdso_getResourcesByResourceTypeId", "raciena6x.resourceTypes.XvcFragment", "&q=label:" + localserviceID.label, function (error, result) {
    if (result) {
      Session.set('service', result);
    }
  });
  Meteor.setInterval(() => {
    var localserviceID = Session.get("serviceID")
    Meteor.call("mdso_getResourcesByResourceTypeId", "raciena6x.resourceTypes.XvcFragment", "&q=label:" + localserviceID.label, function (error, result) {
      if (result) {
        Session.set('service', result);
      }
    });
  }, 5000);
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
