Template.HuaweiDevices.rendered = function() {
    Session.set('devices', {});
};

Template.HuaweiDevices.events({
    'click .service-row': function(event, template) {
        Session.set('device', this);
        Router.go('huawei_device', {
            id: this.id
        });
    },
    'click .device-add': function(e) {
        e.preventDefault();
        $('#deviceModal').modal('show');
    }
});

Template.HuaweiDevices.helpers({
    'deviceProduct': function() {
        return Session.get("deviceProduct");
    },
    'devices': function() {
        return Session.get("devices");
    }
});

Template.HuaweiDevices.created = function() {
    Meteor.call("mdso_getDevices", "rahuawei.resourceTypes.Device", function(error, result) {
        if (result) {
            Session.set('devices', result)
        }

    });

};

Template.deviceModal.events({

    'click .add-device': function(event, template) {
        event.preventDefault();
        var type = $('#type').val()
        var hostname = $('#hostname').val()
        Meteor.call("mdso_addDevice", type, hostname, function(error, result) {
            console.log("adding device type:" + type + " hostname:" + hostname)
            console.log(result)
            if (result) {
                Router.go('huawei_devices');
            }
        });
        $('#deviceModal').modal('hide');
    }
});