Meteor.startup(function () {
	// read environment variables from Meteor.settings
	if (Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for (var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}
});

Meteor.methods({
	'mdso_clicutthrough': function(name, device){
		console.log("Executing CLI " + name + " cutthrough to device:" + device );
		if (name = "reset_device") {
			var body = {
				"properties": {
					"device": device,
					"commands": "configuration reset-to-factory-defaults\n",
					"name": name
				}
			}
			var clicutthrough = Meteor.call("mdso_postResource","Ciena6x", "raciena6x.resourceTypes.CutthroughCli", body)
			console.log("Successfully executed clicutthough")
			return clicutthrough
		}
		if (name = "set_hostname"){
			var body = {
				"properties": {
					"device": device,
					"commands": "configuration reset-to-factory-defaults\n",
					"name": name
				}
			}
			var clicutthrough = Meteor.call("mdso_postResource","Ciena6x", "raciena6x.resourceTypes.CutthroughCli", body)
			console.log("Successfully executed clicutthough")
			return clicutthrough
		}
	},

	'mdso_setHostnameDevices': function(hostname){
		console.log("Patching DeviceDetail:" + hostname.id + " to static assignment " + hostname.properties.staticIP + " " + hostname.properties.hostname );
        var path = "/bpocore/market/api/v1/resources/" + hostname.id
        var appSettings = AppSettings.findOne();
        var url = appSettings.MDSO_server + path
		
		var authToken = mdso_getHash("PATCH", path);
		try {
			var body = {"properties":hostname.properties}
			console.log(body)
			var response = HTTP.call('PATCH', url,
				{
					headers: { "Content-Type": "application/json", "Authorization": authToken },
					npmRequestOptions: { rejectUnauthorized: false },
					data: body
				});
			console.log("Patched DeviceDetail:" + hostname.id);
			return response
		} catch (e) {
			var errorValue = "Error patching DeviceDetail for id: " + hostname.id + " error: " + e
			console.log(errorValue);
			throw new Meteor.Error(errorValue);
		}		
		
	},
	'mdso_getDevices': function(device){
    	var productID = Meteor.call("mdso_getProductID", device)
    	var devices = Meteor.call("mdso_getProducts", productID.id,"")
    	return devices
	},
	'mdso_getDhcpDevices': function(device){
    	var productID = Meteor.call("mdso_getProductID", device)
    	var devices = Meteor.call("mdso_getProducts", productID.id,"&q=properties.dhcpClient:true")
    	return devices
	},	
    'mdso_removeEndpoint': function(service){
        var path = "/bpocore/market/api/v1/resources/" + service.id
        var appSettings = AppSettings.findOne();
        var url = appSettings.MDSO_server + path
        if (service.discovered) {
            console.log("Patching service ID: " + service.id);
    		var authToken = mdso_getHash("PATCH", path);
            try {
                var body = {"discovered":false}
    			var response = HTTP.call('PATCH', url,
    				{
    					headers: { "Content-Type": "application/json", "Authorization": authToken },
    					npmRequestOptions: { rejectUnauthorized: false },
    					data: body
    				});
    			console.log("Patched Service:" + service.id + " to discovered:false");
    		} catch (e) {
    			console.log("Error getting id for MDSO domain: " + domain + " error: " + e);
    			throw new Meteor.Error("Error getting id for MDSO domain: " + domain + " error: " + e);
    		}
        }
        try {
            console.log("Removing service ID: " + service.id);
            authToken = mdso_getHash("DELETE", path);
			var response = HTTP.call('DELETE', url,
				{
					headers: { "Content-Type": "application/json", "Authorization": authToken },
					npmRequestOptions: { rejectUnauthorized: false }
				});
			console.log("Deleted Service:" + service.id);
		} catch (e) {
			console.log("Error deleting service id : " + service.id + " error: " + e);
			throw new Meteor.Error("Error deleting service id:" + service.id + " error: " + e);
		}
    },
	'mdso_postResource' :function(domain, product, body){
		var tenantId =  Meteor.call("mdso_getDomain", domain);
		console.log("Successfully retrieved tenantID:" + tenantId.id);
		var productId = Meteor.call("mdso_getProductID",product);
		console.log("Successfully retrieved productId:" + productId.id);

		var path = "/bpocore/market/api/v1/resources"
		var appSettings = AppSettings.findOne();
		var authToken = mdso_getHash("POST", path);
		var url = appSettings.MDSO_server + path

		body.productId = productId.id
		body.tenantId = tenantId.id

		try {
			var response = HTTP.call('POST', url,
				{
					headers: { "Content-Type": "application/json", "Authorization": authToken },
					npmRequestOptions: { rejectUnauthorized: false },
					data : body
				});
			console.log("Created resource " + response.data.id);
			return {"created":"true"}
		} catch (e) {
			var errorResponse = "Error creating resource for MDSO domain: " + domain + " error: " + e
			console.log(errorResponse);
			throw new Meteor.Error(errorResponse);
		}

	},
    'mdso_addServiceHuawei': function(service){
		var tenantID =  Meteor.call("mdso_getDomain", "EAN");
		tenantID = tenantID.id
		service.tenantId = tenantID
		service.orchState = "active"
		service.autoClean = true
		service.discovered = false
		console.log("service: " + JSON.stringify(service))
		var path = "/bpocore/market/api/v1/resources"
		var appSettings = AppSettings.findOne();
		var authToken = mdso_getHash("POST", path);
		var url = appSettings.MDSO_server + path

		var body = service
		try {
		    console.log("Creating service object: " + JSON.stringify(body))
			var response = HTTP.call('POST', url,
				{
					headers: { "Content-Type": "application/json", "Authorization": authToken , "Accept": "application/json, text/javascript, */*; q=0.01" },
					npmRequestOptions: { rejectUnauthorized: false },
					data : body
				});
			console.log("Created service " + service.label);
			return response
		} catch (e) {
			console.log("Error creating service " + service.label + " error: " + e);
			throw new Meteor.Error("Error creating service " + service.label + " error: " + e);
		}
    },
	'mdso_addCienaDevice' :function(type,hostname){
		console.log("Creating Ciena device type " + type + " hostname " + hostname);

		// Items necessary for POST execution TODO: Move this to the onRender of the page and set a session variable
		var tenantID =  Meteor.call("mdso_getDomain", "Ciena6x");
		tenantID = tenantID.id
		console.log("Successfully retrieved tenantID:" + tenantID);

		var productDeviceId = Meteor.call("mdso_getProductID","raciena6x.resourceTypes.Device");
		productDeviceId = productDeviceId.id
		console.log("Successfully retrieved productDeviceId:" + productDeviceId);

		var path = "/bpocore/market/api/v1/resources"
		var appSettings = AppSettings.findOne();
		var authToken = mdso_getHash("POST", path);
		var url = appSettings.MDSO_server + path
		console.log("url: " + url);
		console.log("Authorization: " + authToken);

		var body = {"label":hostname,"productId":productDeviceId,"tenantId":tenantID,"properties":{
		"typeGroup":"/typeGroups/Ciena6x","authentication":{"cli":{"username":"su","password":"wwp"}},"connection":{"hostname":hostname,"cli":{"hostport":22}}},
		"autoClean":true}
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
	'mdso_addDevice' :function(type,hostname){
		console.log("Creating Huawei device type " + type + " hostname " + hostname);

		// Items necessary for POST execution TODO: Move this to the onRender of the page and set a session variable
		var tenantID =  Meteor.call("mdso_getDomain", "EAN");
		tenantID = tenantID.id
		console.log("Successfully retrieved tenantID:" + tenantID);

		var productDeviceId = Meteor.call("mdso_getProductID","rahuawei.resourceTypes.Device");
		productDeviceId = productDeviceId.id
		console.log("Successfully retrieved productDeviceId:" + productDeviceId);

		var path = "/bpocore/market/api/v1/resources"
		var appSettings = AppSettings.findOne();
		var authToken = mdso_getHash("POST", path);
		var url = appSettings.MDSO_server + path
		console.log("url: " + url);
		console.log("Authorization: " + authToken);

		var body = {"label":hostname,"productId":productDeviceId,"tenantId":tenantID,"properties":{"typeGroup":"/typeGroups/Huawei","authentication":{"cli":{"username":"devops","password":"freelunch"}},"connection":{"hostname":hostname,"cli":{"hostport":22}}},"providerResourceId":"","discovered":false,"orchState":"unkown","reason":"","autoClean":true}
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
	'mdso_getProductID': function(product){
	    console.log("Getting Product ID for product:" + product);
		var path = "/bpocore/market/api/v1/products?includeInactive=false&q=resourceTypeId:" + product
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
			console.log("MDSO Domain " + product + " has device product id: " + did);
			return content.items[0];
		} catch (e) {
			console.log("Error getting id for MDSO Product: " + product + " error: " + e);
			throw new Meteor.Error("Error getting id for MDSO Product: " + product + " error: " + e);
		}
	},

	'mdso_getProducts': function(product,query){
	    console.log("Getting products for product:" + product);
		var path = "/bpocore/market/api/v1/resources?productId=" + product + query
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
			console.log("Resource " + product + " has " + did + " products");
			return content.items;
		} catch (e) {
			console.log("Error getting mdso_getProducts: " + product + " error: " + e);
			throw new Meteor.Error("Error getting mdso_getProducts: " + product + " error: " + e);
		}
	},

	'mdso_getProductsByLabel': function(label, product){
	    console.log("Getting Service:" + label + " for product:" + product);
		var prodID =  Meteor.call("mdso_getProductID", product);
		var productID = prodID.id + "&q=label:" + label
		var products =  Meteor.call("mdso_getProducts", productID);
		console.log("Products with label " + label + ":\n" + JSON.stringify(products, null, 2));

		var did = products.length;
		console.log("Resource " + product + " has " + did + " unique products");
		return products;
	},
	'mdso_getServicesUnique': function(product){
	    console.log("Getting Unique Services list:" + product + " with property: label");
		var path = "/bpocore/market/api/v1/resources?productId=" + product
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
			var services = [];
			var content = JSON.parse(response.content);
			content = content.items
            content.forEach(function(item){
                var searchID = {"id":item.label}
                var index = services.findIndex(services => services.id==item.label)
                if (index === -1){
                    services.push(searchID);
                }
            });
			console.log(JSON.stringify(response, null, 2));
			console.log("services:" + JSON.stringify(services, null, 2));
			var did = services.length;
			console.log("Resource " + product + " has " + did + " unique products");
			return services;
		} catch (e) {
			console.log("Error getting mdso_getServicesUnique: " + product + " error: " + e);
			throw new Meteor.Error("Error getting mdso_getServicesUnique: " + product + " error: " + e);
		}
	},

	'mdso_getProductsByName': function(name){
			var result = Meteor.call("mdso_getProductID", name)
			var products = Meteor.call("mdso_getProducts", result.id)
			return products;
	},

	'mdso_getResourceById': function(id){
		console.log("Getting Resource with id:" + id);
		var path = "/bpocore/market/api/v1/resources/" + id;
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
			return JSON.parse(response.content);
		} catch (e) {
			console.log("Error getting resource with id: " + id);
			throw new Meteor.Error("Error getting resource with id: " + id + " error: " + e);
		}
			return resource;
	},

});
