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
  var str = Iron.Location.get().path;
  var n = str.lastIndexOf('/');
  var sid = str.substring(n + 1);
  var sid = this.data.params.id;
  Session.set('serviceID', { "id": sid });
  var service = new Object();
  Meteor.call("mdso_getProductsByLabel", sid, "raciena6x.resourceTypes.XvcFragment", function (error, result) {
    if (result) {
      service = result;

      $.each(result, function (index, item) {
        Meteor.call("mdso_getResourceById", item.properties.device, function (error, result2) {
          if (result2) {
            // service.details.push(result2);
            service[index].details = result2;
            Session.set('service', service);
          }
        });
      });
    console.log("service: ");
    console.log(service);
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
