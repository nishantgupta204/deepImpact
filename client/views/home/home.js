Template.Home.rendered = function() {
	
};

Template.Home.events({
	
});

Template.Home.helpers({
    'token': function() {
    return Session.get("token");
  }
});

Template.Home.created = function () {
	Session.set('token', "");
	Meteor.call("mdso_getToken", function (error, result) {
    if (result) {
      Session.set('token', result);
    }
  });
};