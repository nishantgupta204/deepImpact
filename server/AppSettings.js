AppSettings = new Mongo.Collection("AppSettings");

var settings = {
    "MDSO_server" : "https://10.206.31.150",
    "MDSO_user"   : "admin",
    "MDSO_pass"   : "adminpw",
    
    // Obtain key from UAC in BP Server
    // HMAC code does not yet function.  Pull requests welcome
    "MDSO_keyID"  : "27a0a900eb3262010d83bc08b39106c90a597cfe",
    "MDSO_keySecret": "3ded42036374bd69853d957cc84cbf09fa37bb46"
};

AppSettings.allow({
  insert: function(userId, setting){
    return false;
  },
  update: function(userId, setting){
    return false;
  },
  remove: function(userId, setting){
    return false;
  }
});


if (AppSettings.find().count() === 0) {
  AppSettings.insert(settings);
}