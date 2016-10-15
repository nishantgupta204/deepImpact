Template.CienaDevices.rendered = function() {
    Session.set('devices', {});
};

Template.CienaDevices.events({
    'click .service-row': function(event, template) {
        Session.set('device', this);
        Router.go('ciena_device', {
            id: this.id
        });
    },
    'click .device-add': function(e) {
        e.preventDefault();
        $('#deviceModal').modal('show');
    }
});

Template.CienaDevices.helpers({
	'deviceProduct': function() {
        return Session.get("deviceProduct");
    },
    'devices': function() {
        return Session.get("devices");
    }
});

Template.CienaDevices.created = function() {
  Meteor.setInterval(() => {    
    Meteor.call("mdso_getDevices", "raciena6x.resourceTypes.Device", function(error, result) {
        if (result) {
            Session.set('devices', result)
        }

    });
  },5000)

};

Template.deviceModalCiena.events({

    'click .add-device': function(event, template) {
        event.preventDefault();
        var type = $('#type').val()
        var hostname = $('#hostname').val()
        Meteor.call("mdso_addDevice", type, hostname, function(error, result) {
            console.log("adding device type:" + type + " hostname:" + hostname)
            console.log(result)
            if (result) {
                Router.go('ciena_devices');
            }
        });
        $('#deviceModalCiena').modal('hide');
    }
});