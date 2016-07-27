mdso_getHash = function (method, path) {
  //this function does not yet function  :)
  import { Random } from 'meteor/random'
  var appSettings = AppSettings.findOne();
  var port = 443;
  var api_key_id = appSettings.MDSO_keyID;
  var api_secret = appSettings.MDSO_keySecret;
  var nonce = Random.secret().valueOf();
  var timestamp = new Date().valueOf();
  var host = appSettings.MDSO_server;
  var string_to_sign = [timestamp, nonce, method, path, host, port].join("\n")
  var hash = CryptoJS.HmacSHA256(string_to_sign, api_secret).toString(CryptoJS.enc.hex);
  var base64 = new Buffer(hash, 'hex').toString("base64");

  // Sample 
  // var host = "bp.example.com"
  // var path = "/test/api/v1/foos?q=bar"
  // var method  = "GET"
  // var api_key_id = "ae71d7d92d7d4c659a7d3336db6c4c99"
  // var api_secret = "7888cef675c44e8f862bae75186140d7"
  // var timestamp = 1400863370
  // var nonce = "Jw1ctgzz2X2n+6DDOBlEig=="
  // var string_to_sign = [timestamp, nonce, method, path, host, port].join("\\n")
  // var hash = CryptoJS.HmacSHA256(string_to_sign, api_secret).toString(CryptoJS.enc.hex);
  // // Computed HMAC: d6aae9d2852a306aa2688f3d90adcca6b40c99ba2f27e4417cd0c7ff16ab2d3e
  // var base64 = new Buffer(hash,'hex').toString("base64");
  // // Computed Base64: 1qrp0oUqMGqiaI89kK3MprQMmbovJ+RBfNDH/xarLT4=

  var header = "MAC id=\"" + api_key_id + "\", ts=\"" + timestamp + "\", nonce=\"" + nonce + "\", mac=\"" + base64 + "\"";
  // var header = "MAC id=" + api_key_id + ",ts=" + timestamp + ",nonce=" + nonce + ",mac=" + base64;
  return header;
}

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