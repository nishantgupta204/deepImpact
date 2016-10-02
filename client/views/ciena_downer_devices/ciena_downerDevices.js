Template.CienaDownerDevices.rendered = function() {
    Session.set('devices', {});
};

Template.CienaDownerDevices.events({
    'click .set-hostname': function(event, template) {
        var setHostname = {
            "id": this.id,
            "properties": {
                "staticGateway": this.properties.dhcpGateway,
                "dhcpClient": false,
                "hostname": document.getElementById('input' + this.id).value,
                "staticIP": this.properties.dhcpIP
            }
        }
        Meteor.call("mdso_setHostnameDevices", setHostname, function(error, result) {
            if (result) {
                Router.go('ciena_downer_devices');
            }

        });

    }
});

Template.CienaDownerDevices.helpers({
    'deviceProduct': function() {
        return Session.get("deviceProduct");
    },
    'devices': function() {
        return Session.get("devices");
    }
});

Template.CienaDownerDevices.created = function() {
    Meteor.call("mdso_getDhcpDevices", "raciena6x.resourceTypes.DeviceDetail", function(error, result) {
        if (result) {
            Session.set('devices', result)
        }

    });

};