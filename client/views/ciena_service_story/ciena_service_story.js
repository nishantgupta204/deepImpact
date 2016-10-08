  var scosCfg = [{
    "classOfServiceName": "Real Time",
    "ingressCir": 0
  }]
  var mcosCfg = [{
    "classOfServiceName": "Real Time",
    "ingressCir": 0
  }, {
    "classOfServiceName": "Interactive",
    "ingressCir": 0
  }, {
    "classOfServiceName": "Business Critical",
    "ingressCir": 0
  }, {
    "classOfServiceName": "Non Critical",
    "ingressCir": 0
  }, ]
  var bws = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
  Template.CienaServiceStory.rendered = function () {
    Session.set('serviceStory', {"cosId":"EVC"});
  };

  Template.CienaServiceStory.events({

  });

  Template.CienaServiceStory.helpers({
    'domain': function () {
      return Session.get("domain");
    },
    'serviceStory': function () {
      return Session.get("serviceStory");
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
      localServiceStory.endpoint = {}
      localServiceStory.endpoints = [{
        "properties": {
          "device": "selectA",
          "id": "SIPxxxx",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
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
      localServiceStory.endpoint = {}
      localServiceStory.endpoints = [{
        "properties": {
          "device": "selectA",
          "id": "BIAxxxx",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
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
      localServiceStory.pipe = "true"
      Session.set('serviceStory', localServiceStory);
    },
    'click .pipeFalse': function (e, t) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.pipe = "false"
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
      localServiceStory.cosCfg = scosCfg
      localServiceStory.endpoint = {}
      localServiceStory.endpoints = [{
        "properties": {
          "device": "selectA",
          "cosId":"EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": "5"
          }]
        }
      }, {
        "properties": {
          "device": "selectZ",
          "cosId":"EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
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
      localServiceStory.cosCfg = scosCfg
      localServiceStory.endpoint = {}
      localServiceStory.endpoints = [{
        "properties": {
          "device": "selectA",
          "cosId":"EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": "5"
          }]
        }
      }, {
        "properties": {
          "device": "selectZ",
          "cosId":"EVC",
          "ennis": [{
            "id": "1",
            "cosCfg": scosCfg
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
      localServiceStory.endpoint = {}
      localServiceStory.endpoints = [{
        "properties": {
          "device": "selectA",
          "cosId":"EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": "5"
          }]
        }
      }, {
        "properties": {
          "device": "selectB",
          "cosId":"EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": "5"
          }]
        }
      }, {
        "properties": {
          "device": "selectC",
          "cosId":"EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
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
      localServiceStory.bundling = "P"
      Session.set('serviceStory', localServiceStory);
    },
    'click .bundlingEVP': function (e, t) {
      var localServiceStory = Session.get("serviceStory")
      if (localServiceStory.topo == "eline") {
        localServiceStory.evcID = "EVPxxxxx"
      }
      if (localServiceStory.topo == "elan") {
        localServiceStory.evcID = "EVNxxxxx"
      }
      if (localServiceStory.topo == "eaccess") {
        localServiceStory.evcID = "AVPxxxx"
      }
      localServiceStory.bundling = "VP"
      Session.set('serviceStory', localServiceStory);
    },

  });

  // CienaServiceStoryHeader

  Template.CienaServiceStoryHeader.helpers({
    'serviceStory': function () {
      return Session.get("serviceStory");
    },
    'bws': function () {
      return bws;
    },
    'mcosCfgs': function(){
      return mcosCfg;
    },
    'serviceStoryText': function () {
      return JSON.stringify(Session.get("serviceStory"),null, 2);
    },
    
  });

  Template.CienaServiceStoryHeader.events({
    'change #cosID': function (e, t) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.cosId = "PCP"
      if (e.target.value == "PCP") {
        for (i = 0; i < localServiceStory.endpoints.length; ++i) {
          localServiceStory.endpoints[i].cosId = "PCP"
          if (localServiceStory.endpoints[i].properties.unis) {
            for (index = 0; index < localServiceStory.endpoints[i].properties.unis.length; ++index) {
              localServiceStory.endpoints[i].properties.unis[index].cosCfg = mcosCfg
            }
          }
        }
        localServiceStory.cosCfg = mcosCfg
      }
      if (e.target.value == "EVC") {
      localServiceStory.cosId = "EVC"
        for (i = 0; i < localServiceStory.endpoints.length; ++i) {
          localServiceStory.endpoints[i].cosId = "EVC"
          if (localServiceStory.endpoints[i].properties.unis) {
            for (index = 0; index < localServiceStory.endpoints[i].properties.unis.length; ++index) {
              localServiceStory.endpoints[i].properties.unis[index].cosCfg = scosCfg

            }
          }
        }
        localServiceStory.cosCfg = scosCfg
      }
      if (e.target.value == "DSCP") {
      localServiceStory.cosId = "DSCP"        
        for (i = 0; i < localServiceStory.endpoints.length; ++i) {
          localServiceStory.endpoints[i].cosId = "DSCP"
          if (localServiceStory.endpoints[i].properties.unis) {
            for (index = 0; index < localServiceStory.endpoints[i].properties.unis.length; ++index) {
              localServiceStory.endpoints[i].properties.unis[index].cosCfg = mcosCfg
            }
          }
        }
        localServiceStory.cosCfg = mcosCfg
      }
      Session.set('serviceStory', localServiceStory);
    }
  });