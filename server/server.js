Meteor.startup(function () {
	// read environment variables from Meteor.settings
	if (Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for (var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}
});

Meteor.methods({
	'sendMail': function (options) {
		this.unblock();

		Email.send(options);
	},

	'mdso_getDomain': function (domain) {
		console.log("Getting info for MDSO Domain: " + domain);
		var path = "/bpocore/market/api/v1/domains?q=domainType:urn:ciena:bp:domain:" + domain
		var appSettings = AppSettings.findOne();
		var authToken = mdso_getHash("GET", path);
		var url = appSettings.MDSO_server + path
		console.log("url: " + url);
		console.log("Authorization: " + authToken);
		try {
			var response = HTTP.call('GET', url,
				{
					headers: { "Content-Type": "application/json", "Authorization": authToken },
					npmRequestOptions: { rejectUnauthorized: false }
				});

			console.log(JSON.stringify(response, null, 2));
			var content = JSON.parse(response.content);
			var did = content.items[0].id;
			console.log("MDSO Domain " + domain + " has id: " + did);
			return content.items[0];
		} catch (e) {
			console.log("Error getting id for MDSO domain: " + domain + " error: " + e);
			throw new Meteor.Error("Error getting id for MDSO domain: " + domain + " error: " + e);
		}
	},
	'mdso_getProductDeviceID': function(domain){
	    console.log("Getting DeviceID for MDSO Domain:" + domain);
		var path = "/bpocore/market/api/v1/products?includeInactive=false&q=resourceTypeId:" + domain + ".resourceTypes.Device"
		var appSettings = AppSettings.findOne();
		var authToken = mdso_getHash("GET", path);
		var url = appSettings.MDSO_server + path
		console.log("url: " + url);
		console.log("Authorization: " + authToken);
		try {
			var response = HTTP.call('GET', url,
				{
					headers: { "Content-Type": "application/json", "Authorization": authToken },
					npmRequestOptions: { rejectUnauthorized: false }
				});

			console.log(JSON.stringify(response, null, 2));
			var content = JSON.parse(response.content);
			var did = content.items[0].id;
			console.log("MDSO Domain " + domain + " has device product id: " + did);
			return content.items[0];
		} catch (e) {
			console.log("Error getting id for MDSO Product: " + productName + " error: " + e);
			throw new Meteor.Error("Error getting id for MDSO Product: " + productName + " error: " + e);
		}
	},
	
	'mdso_getDevices': function(deviceID){
	    console.log("Getting devices for deviceID:" + deviceID);
		var path = "/bpocore/market/api/v1/resources?productId=" + deviceID
		var appSettings = AppSettings.findOne();
		var authToken = mdso_getHash("GET", path);
		var url = appSettings.MDSO_server + path
		console.log("url: " + url);
		console.log("Authorization: " + authToken);
		try {
			var response = HTTP.call('GET', url,
				{
					headers: { "Content-Type": "application/json", "Authorization": authToken },
					npmRequestOptions: { rejectUnauthorized: false }
				});

			console.log(JSON.stringify(response, null, 2));
			var content = JSON.parse(response.content);
			var did = content.items.length;
			console.log("Resource Device " + deviceID + " has " + did + " devices");
			return content.items;
		} catch (e) {
			console.log("Error getting mdso_getDevices: " + deviceID + " error: " + e);
			throw new Meteor.Error("Error getting mdso_getDevices: " + deviceID + " error: " + e);
		}
	},
	'mdso_getProductId': function(){
	    console.log("Getting DeviceID for MDSO Domain: " );
	},
	'mdso_getTenantId': function(){
	    console.log("Getting DeviceID for MDSO Domain: " );
	},
	
	'mdso_createEANDevice': function() {
	    var data = JSON.stringify({
      "label": "ATN",
      "productId": "5796f274-23c2-410e-abc1-a716b39e5803",
      "tenantId": "5796f274-81f1-49e9-a9a5-638a0c9bf773",
      "properties": {
        "typeGroup": "/typeGroups/Huawei",
        "resourceType": "/resourceTypes/ATN950B",
        "authentication": {
          "cli": {
            "username": "devops",
            "password": "freelunch"
          }
        },
        "connection": {
          "hostname": "192.168.162.82",
          "cli": {
            "hostport": 22
          }
        }
      },
      "providerResourceId": "",
      "discovered": false,
      "orchState": "unkown",
      "reason": "",
      "autoClean": true
    });
    

	}
	
	
	


});