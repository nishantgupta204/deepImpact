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
	'mdso_addDevice' :function(type,hostname){
		console.log("Creating Huawei device type " + type + " hostname " + hostname);
		
		// Items necessary for POST execution TODO: Move this to the onRender of the page and set a session variable
		var tenantID =  Meteor.call("mdso_getDomain", "EAN");
		tenantID = tenantID.id
		console.log("Successfully retrieved tenantID:" + tenantID);
		
		var productDeviceId = Meteor.call("mdso_getProductDeviceID","rahuawei");
		productDeviceId = productDeviceId.id
		console.log("Successfully retrieved productDeviceId:" + productDeviceId);

		var path = "/bpocore/market/api/v1/resources"
		var appSettings = AppSettings.findOne();
		var authToken = mdso_getHash("POST", path);
		var url = appSettings.MDSO_server + path
		console.log("url: " + url);
		console.log("Authorization: " + authToken);

		var body = {"label":hostname,"productId":productDeviceId,"tenantId":tenantID,"properties":{"typeGroup":"/typeGroups/Huawei","resourceType":"/resourceTypes/"+type,"authentication":{"cli":{"username":"devops","password":"freelunch"}},"connection":{"hostname":hostname,"cli":{"hostport":22}}},"providerResourceId":"","discovered":false,"orchState":"unkown","reason":"","autoClean":true}
		try {
			var response = HTTP.call('POST', url,
				{
					headers: { "Content-Type": "application/json", "Authorization": authToken },
					npmRequestOptions: { rejectUnauthorized: false },
					data : body
				});
			console.log("Created device " + hostname);
			return {"created":"true"}
		} catch (e) {
			console.log("Error creating device id for MDSO domain: " + hostname + " error: " + e);
			throw new Meteor.Error("Error creating device id for MDSO domain: " + hostname + " error: " + e);
		}
	},
    'mdso_deleteDevice':function (id) {
		console.log("Deleting device with ID: " + id);
		var path = "/bpocore/market/api/v1/resources/" + id
		var appSettings = AppSettings.findOne();
		var authToken = mdso_getHash("DELETE", path);
		var url = appSettings.MDSO_server + path
		console.log("url: " + url);
		console.log("Authorization: " + authToken);
		try {
			var response = HTTP.call('DELETE', url,
				{
					headers: { "Content-Type": "application/json", "Authorization": authToken },
					npmRequestOptions: { rejectUnauthorized: false }
				});
			console.log("Deleted Device " + id);
			return {"deleted":"true"}
		} catch (e) {
			console.log("Error getting id for MDSO domain: " + domain + " error: " + e);
			throw new Meteor.Error("Error getting id for MDSO domain: " + domain + " error: " + e);
		}
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
	}
});