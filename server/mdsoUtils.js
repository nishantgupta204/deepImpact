mdso_getHash = function (method, path) {
  import { Random } from 'meteor/random'
  var appSettings = AppSettings.findOne();
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