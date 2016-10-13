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
  Meteor.call("mdso_getServicesUnique", "rahuawei.resourceTypes.XvcFragment", function (error, result) {
    if (result) {
      Session.set('services', result);
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
        Session.set('device', myDevice);

      },
    'click .add-service': function(event, template) {
        event.preventDefault();
        var service = {};
        service.properties = {}
        service.properties.id = $('#id').val()
        service.properties.peers = ["1.1.1.1"]
        service.properties.innis = []
        service.properties.vsiId = $('#id').val()
        inni = {}
        inni.id = "0/1/0"
        inni.stag = parseInt($('#stag').val())
        inni.cir = parseInt($('#cir').val())
        service.properties.innis.push(inni);
        service.label = $('#id').val()
        service.properties.device = Session.get("device").id
        service.productId = Session.get("xvcProduct").id
        Meteor.call("mdso_addServiceHuawei", service, function(error, result) {
            console.log("adding service type:" + service)
            console.log(result)
            if (result) {
                alert(JSON.stringify(result));
//                Router.go('huawei_services/' + $('#id').val());
            }
        });
        
        $('#serviceModal').modal('hide');
    }
      
});
