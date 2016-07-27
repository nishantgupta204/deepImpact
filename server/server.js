Meteor.startup(function () {
	// read environment variables from Meteor.settings
	if (Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for (var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}
});

Meteor.methods({
	"sendMail": function (options) {
		this.unblock();

		Email.send(options);
	},

	'domain': function () {
		return Session.get("domain");
	},
	"mdso_getDomain": function (domain) {
		console.log("Getting info for MDSO Domain: " + domain);

		var appSettings = AppSettings.findOne();
		var authToken = mdso_getAuthToken(appSettings);
		var url = appSettings.MDSO_server + "/bpocore/market/api/v1/domains?q=domainType:urn:ciena:bp:domain:" + domain
		console.log("url: " + url);
		console.log("Authorization: " + authToken);
		try {
			var response = HTTP.call('GET', url,
				{
					headers: { "Content-Type": "application/json", "Authorization": authToken },
					// {headers: {"Content-Type": "application/json"},
					npmRequestOptions: { rejectUnauthorized: false }
				});

			console.log(JSON.stringify(response, null, 2));
			var content = JSON.parse(response.content);
			var did = content.items[0].id;
			console.log("MDSO Domain " + domain + " has id: " + did);
			return content.items[0];
		} catch (e) {
			console.log("Error getting id for MDSO Product: " + productName + " error: " + e);
			throw new Meteor.Error("Error getting id for MDSO Product: " + productName + " error: " + e);
		}
	}


});