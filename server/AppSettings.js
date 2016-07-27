AppSettings = new Mongo.Collection("AppSettings");

var settings = {
    "MDSO_server" : "https://192.168.162.5",
    "MDSO_user"   : "admin",
    "MDSO_pass"   : "adminpw",
    
    // Obtain key from UAC in BP Server
    // HMAC code does not yet function.  Pull requests welcome
    "MDSO_keyID"  : "832a3e59164e674ab0794c988c7a776a34376f22",
    "MDSO_keySecret": "cce9c7daa8fd82ad3faca8e5373c35d8a1af126c"
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