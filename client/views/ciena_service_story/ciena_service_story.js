Template.CienaServiceStory.rendered = function () {
  Session.set('serviceStory', {});
};

Template.CienaServiceStory.events({

});

Template.CienaServiceStory.helpers({
  'domain': function () {
    return Session.get("domain");
  },
  'serviceStory': function () {
    return Session.get("serviceStory");
  },
  'serviceStoryText': function () {
    return JSON.stringify(Session.get("serviceStory"));
  }
});

Template.CienaServiceStory.created = function () {
  Session.set('domain', {});
  Session.set('serviceStory', {});

  Meteor.call("mdso_getDomain", "Ciena6x", function (error, result) {
    if (result) {
      Session.set('domain', result);
    }
  });
};

// CienaServiceStoryType

Template.CienaServiceStoryType.events({
  'click .CE': function (e, t) {
    var localServiceStory = Session.get("serviceStory")
    localServiceStory.type = 'CE'
    localServiceStory.endpoints = []
    Session.set('serviceStory', localServiceStory);
  },
  'click .sip': function (e, t) {
    var localServiceStory = Session.get("serviceStory")
    localServiceStory.type = 'sip'
    localServiceStory.topo = 'point'
    localServiceStory.endpoints = [{
      "properties": {
        "device": "selectA",
        "id": "SIPxxxx",
        "unis": [{
          "id": "1"
        }],
        "innis": [{
          "id": "5"
        }]
      }
    }]
    Session.set('serviceStory', localServiceStory);
  },
  'click .internet': function (e, t) {
    var localServiceStory = Session.get("serviceStory")
    localServiceStory.type = 'internet'
    localServiceStory.topo = 'point'
    localServiceStory.endpoints = [{
      "properties": {
        "device": "selectA",
        "id": "BIAxxxx",
        "unis": [{
          "id": "1"
        }],
        "innis": [{
          "id": "5"
        }]
      }
    }]
    Session.set('serviceStory', localServiceStory);
  }
});

Template.CienaServiceStoryType.helpers({
  'serviceStory': function () {
    return Session.get("serviceStory");
  }
});


// CienaServiceStoryCEPipe

Template.CienaServiceStoryCEPipe.helpers({
  'serviceStory': function () {
    return Session.get("serviceStory");
  }
});

Template.CienaServiceStoryCEPipe.events({
  'click .pipeTrue': function (e, t) {
    var localServiceStory = Session.get("serviceStory")
    localServiceStory.pipe = true
    Session.set('serviceStory', localServiceStory);
  },
  'click .pipeFalse': function (e, t) {
    var localServiceStory = Session.get("serviceStory")
    localServiceStory.pipe = false
    Session.set('serviceStory', localServiceStory);
  }
});

// CienaServiceStoryCETopo
Template.CienaServiceStoryCETopo.helpers({
  'serviceStory': function () {
    return Session.get("serviceStory");
  }
});

Template.CienaServiceStoryCETopo.events({
  'click .eline': function (e, t) {
    var localServiceStory = Session.get("serviceStory")
    localServiceStory.topo = "eline"
    localServiceStory.endpoints = [{
      "properties": {
        "device": "selectA",
        "id": "EPLxxxx",
        "unis": [{
          "id": "1"
        }],
        "innis": [{
          "id": "5"
        }]
      }
    }, {
      "properties": {
        "device": "selectZ",
        "id": "EPLxxxx",
        "unis": [{
          "id": "1"
        }],
        "innis": [{
          "id": "5"
        }]
      }
    }]
    Session.set('serviceStory', localServiceStory);
  },
  'click .eaccess': function (e, t) {
    var localServiceStory = Session.get("serviceStory")
    localServiceStory.topo = "eaccess"
    localServiceStory.endpoints = [{
      "properties": {
        "device": "selectA",
        "id": "EPLxxxx",
        "unis": [{
          "id": "1"
        }],
        "innis": [{
          "id": "5"
        }]
      }
    }, {
      "properties": {
        "device": "selectZ",
        "id": "EPLxxxx",
        "ennis": [{
          "id": "1"
        }],
        "innis": [{
          "id": "5"
        }]
      }
    }]    
    Session.set('serviceStory', localServiceStory);
  },
  'click .elan': function (e, t) {
    var localServiceStory = Session.get("serviceStory")
    localServiceStory.topo = "elan"
    localServiceStory.endpoints = [{
      "properties": {
        "device": "selectA",
        "id": "EPLxxxx",
        "unis": [{
          "id": "1"
        }],
        "innis": [{
          "id": "5"
        }]
      }
    }, {
      "properties": {
        "device": "selectB",
        "id": "EPLxxxx",
        "ennis": [{
          "id": "1"
        }],
        "innis": [{
          "id": "5"
        }]
      }
    }, {
      "properties": {
        "device": "selectC",
        "id": "EPLxxxx",
        "ennis": [{
          "id": "1"
        }],
        "innis": [{
          "id": "5"
        }]
      }
    }]       
    Session.set('serviceStory', localServiceStory);
  }
});

// CienaServiceStoryBundling

Template.CienaServiceStoryBundling.helpers({
  'serviceStory': function () {
    return Session.get("serviceStory");
  }
});

Template.CienaServiceStoryBundling.events({
  'click .bundlingEP': function (e, t) {
    var localServiceStory = Session.get("serviceStory")
    localServiceStory.bundling = "EP"
    Session.set('serviceStory', localServiceStory);
  },
  'click .bundlingEVP': function (e, t) {
    var localServiceStory = Session.get("serviceStory")
    localServiceStory.bundling = "EVP"
    Session.set('serviceStory', localServiceStory);
  }
});