mdso_getHash = function (method, path) {
  import { Random } from 'meteor/random'
  var appSettings = mdso_serverSettings()
  var port = 443;
  var api_key_id = appSettings.MDSO_keyID;
  var api_secret = appSettings.MDSO_keySecret;
  var nonce = Random.secret().valueOf();

  var timestamp = new Date().valueOf();

  var host = appSettings.MDSO_server.substring(appSettings.MDSO_server.indexOf('//') + 2 ,50)
  var string_to_sign = [timestamp, nonce, method, path, host, port].join("\n")
  var hash = CryptoJS.HmacSHA256(string_to_sign, api_secret).toString(CryptoJS.enc.hex);
  var base64 = new Buffer(hash, 'hex').toString("base64");

  var header = "MAC id=\"" + api_key_id + "\", ts=\"" + timestamp + "\", nonce=\"" + nonce + "\", mac=\"" + base64 + "\"";
  return header;
};

mdso_serverSettings = function(){
  var settings = {
      // "MDSO_server" : "https://10.206.31.150",
      // Devops toolkit setting
      "MDSO_server" : "http://localhost:9980",
      "MDSO_user"   : "admin",
      "MDSO_pass"   : "adminpw",
      
      // Obtain key from UAC in BP Server
      "MDSO_keyID"  : "27a0a900eb3262010d83bc08b39106c90a597cfe",
      "MDSO_keySecret": "3ded42036374bd69853d957cc84cbf09fa37bb46"
  };
  return settings
};

mdso_getAuthToken = function (appSettings) {
  console.log("mdso_getAuthToken() using AppSettings: " + JSON.stringify(appSettings, null, 2));
  var mdso = appSettings.MDSO_server;
  var mdsoLogin = { "name": appSettings.MDSO_user, "password": appSettings.MDSO_pass, "domain": { "name": "master" } };
  console.log("Getting MDSO Authorization Token");
  try {
    var response = HTTP.post(mdso + '/bpocore/authentication/api/v1/tokens',
      {
        headers: { "Content-Type": "application/json" },
        data: mdsoLogin,
        npmRequestOptions: { rejectUnauthorized: false }
      });
    var authToken = "token " + response.headers['x-subject-token'];
    console.log("Got MDSO Authorization Token: " + authToken);
    return authToken;
  } catch (e) {
    console.log("error getting MDSO Authorization Token: " + e);
    throw new Meteor.Error("error getting MDSO Authorization Token: " + e);
  }
};