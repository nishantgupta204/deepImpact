Template.CienaServiceDetail.rendered = function () {
  Session.set('endpoints', {});
  Session.set('endpointsDetail', {});
  
};

Template.CienaServiceDetail.helpers({
  'serviceID': function () {
    return Session.get("serviceID");
  }
});

Template.CienaServiceDetailEndpoints.events({
  'click .services-delete': function (event, target) {
    alert(JSON.stringify(this))
    $('#serviceDeleteConfirmModal').modal('show');
  },
  'click .endpoint-remove': function (event, target) {
    var localservice = Session.get("endpoints")
    delService = localservice[event.currentTarget.id]
    Meteor.call("mdso_removeEndpoint", delService, function (error, result) {});
  }
});

Template.CienaServiceDetailEndpoints.helpers({
  'serviceID': function () {
    return Session.get("serviceID");
  },
  'endpoints': function () {
    return Session.get("endpoints");
  },
  'endpointsDetail': function () {
    return Session.get("endpointsDetail");
  }  
});

Template.CienaServiceDetailEndpoints.created = function () {
  var localserviceID = Session.get("serviceID") 
  Meteor.call("mdso_getResourcesByResourceTypeId", "raciena6x.resourceTypes.XvcFragment", "&q=label:" + localserviceID.label, function (error, result) {
    if (result) {
      Session.set('endpoints', result);
      localEndpointsDetail = result
      for (let endpoint of localEndpointsDetail) {
        Meteor.call("mdso_getResourceById", endpoint.properties.device, function (error, result) {
          endpoint.properties.ip = result.properties.connection.hostname
          Session.set('endpointsDetail', localEndpointsDetail);
          Session.set('endpoints', localEndpointsDetail);
          Meteor.call("mdso_DeviceDetailByIP", result.properties.connection.hostname, function (error, result) {
            endpoint.properties.hostname = result[0].properties.hostname
            Session.set('endpointsDetail', localEndpointsDetail);
            Session.set('endpoints', localEndpointsDetail);
          })
        })
      }
    }
  });
  Meteor.setInterval(() => {
  var localserviceID = Session.get("serviceID")
  var localEndpointsDetail = Session.get("endpointsDetail")
  Meteor.call("mdso_getResourcesByResourceTypeId", "raciena6x.resourceTypes.XvcFragment", "&q=label:" + localserviceID.label, function (error, result) {
    if (result) {
      localEndpoint = result
      localEndpoint.forEach(function(endpoint, i) {
        endpoint.properties.ip = localEndpointsDetail[i].properties.ip
        endpoint.properties.hostname = localEndpointsDetail[i].properties.hostname
      }, this);
      Session.set('endpoints', localEndpoint);
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