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
    Meteor.call("mdso_getDevices", "rahuawei.resourceTypes.Device", function (error, result){
        if (result){
            Session.set('deviceList', result)
            $('#serviceModal').modal('show');
        }
    });
    
  }
});

Template.HuaweiServices.helpers({
    'xvcProduct': function() {
    return Session.get("xvcProduct");
  },
    'services': function() {
    return Session.get("services");
  },
    'deviceList': function(){
     return Session.get("deviceList");
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

Template.serviceModal.helpers({
   'deviceList': function(){
     return Session.get("deviceList");
   }
});

Template.serviceModal.events({
    'change #deviceSelect' : function(event){
        function findDevice(device) { 
            var dev = $("#deviceSelect").val()
            return device.properties.swType === dev;
        }
        var device = Session.get("deviceList")
        var myDevice = device.find(findDevice)
        console.log(JSON.stringify(myDevice))
      }
      
});
