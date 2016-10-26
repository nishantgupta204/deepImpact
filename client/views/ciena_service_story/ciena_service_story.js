  import Clipboard from 'clipboard'
    new Clipboard('.btn');

  var scosCfg = [{
    "classOfServiceName": "RealTime",
    "ingressCir": 0
  }]
  var mcosCfg = [{
    "classOfServiceName": "RealTime",
    "ingressCir": 0
  }, {
    "classOfServiceName": "Interactive",
    "ingressCir": 0
  }, {
    "classOfServiceName": "BusinessCritical",
    "ingressCir": 0
  }, {
    "classOfServiceName": "NonCritical",
    "ingressCir": 0
  }, ]
  var bws = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
  Template.CienaServiceStory.rendered = function () {
    Session.set('serviceStory', {
      "cosId": "EVC"
    });
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
            "id": ""
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
            "id": ""
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
        "bpo":{"properties": {
          "device": "selectA",
          "cosId": "EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": ""
          }]
        }}
      }, {"bpo":{
        "properties": {
          "device": "selectZ",
          "cosId": "EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": ""
          }]
      }}
      }]
      Session.set('serviceStory', localServiceStory);
    },
    'click .eaccess': function (e, t) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.topo = "eaccess"
      localServiceStory.cosCfg = scosCfg
      localServiceStory.endpoint = {}
      localServiceStory.endpoints = [{
        "bpo":{"properties": {
          "device": "selectA",
          "cosId": "EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": ""
          }]
        }}
      }, {"bpo":{
        "properties": {
          "device": "selectZ",
          "cosId": "EVC",
          "ennis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": ""
          }]
      }}
      }]
      Session.set('serviceStory', localServiceStory);
    },
    'click .elan': function (e, t) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.topo = "elan"
      localServiceStory.endpoint = {}
      localServiceStory.endpoints = [
        {"bpo":{"properties": {
          "device": "select1",
          "cosId": "EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": ""
          }]
        }}
      }, {"bpo":{
        "properties": {
          "device": "select2",
          "cosId": "EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": ""
          }]
      }}
      }, {"bpo":{
        "properties": {
          "device": "select3",
          "cosId": "EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": ""
          }]
      }}
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
      localServiceStory.endpoints.forEach(function (endpoint) {
      if (endpoint.bpo.properties.unis) {
        endpoint.bpo.properties.unis.forEach(function (uni) {
          uni.ceVlanMap = {"vlans":"",untagged:false}

        }, this)
      }
      })      
      localServiceStory.bundling = "VP"
      Session.set('serviceStory', localServiceStory);
    },

  });

  // CienaServiceStoryHeader

  Template.CienaServiceStoryHeader.created = function () {
    Session.set('deviceList', {});
    $('[data-toggle="tooltip"]').tooltip(); 

    Meteor.call("mdso_getDevices", "raciena6x.resourceTypes.DeviceDetail", function (error, result) {
      if (result) {
        Session.set('deviceList', result);
      }
    });
  };

  Template.CienaServiceStoryHeader.helpers({
    'serviceStory': function () {
      var localServiceStory = Session.get("serviceStory")
      return localServiceStory;
    },
    'deviceList': function () {
      var localDeviceList = Session.get("deviceList")
      return localDeviceList;
    },
    'bws': function () {
      return bws;
    },
    'mcosCfgs': function () {
      return mcosCfg;
    },
    'stringify': function(object){
      return JSON.stringify(object, null, 2);
    },
    'getCommands': function(object){
      Meteor.call("mdso_getCommands", object, function (error, result) {
        if (result) {
          return result
        }
      });
    }
  });

  Template.CienaServiceStoryHeader.events({
    'click #cancelButton': function (e, t) {
      Session.set("serviceStory", {});
    },
    // 'click .service-get-commands': function(e,t){
    //     var myTimer = function(){
    //       alert('wtf')
    //     }
    //     Meteor.setTimeout(myTimer, 1000); // check again in a second
    // },
    'click .service-get-commands': function(e,t){
      var localServiceStory = Session.get("serviceStory")
      var times = 0
      // var getCommands = function(cindex){
      //   Meteor.call("mdso_getCienaServiceCommands", localServiceStory.endpoints[cindex].bpo, function (error, result) {

      //   })
      // }
      // var getResource = function(rindex){

      // }
      for (index = 0; index < localServiceStory.endpoints.length; ++index) {
        // localServiceStory.endpoints[index].commands = "a"
        (function(index){
        Meteor.call("mdso_getCienaServiceCommands", localServiceStory.endpoints[index].bpo, function (error, result) {
          var commandsId = result.data.id
          var getResource = function(resourceIndex){
            Meteor.call("mdso_getResourceById", commandsId, function (error, result) {
              // console.log(result)
              if (result.properties.result.commands){
                // console.log(result.properties.result.commands)
                // console.log(localServiceStory.endpoints[resourceIndex])
                localServiceStory.endpoints[resourceIndex].commands = []
                localServiceStory.endpoints[resourceIndex].commands = result.properties.result.commands
                Session.set('serviceStory', localServiceStory);
                Meteor.call('mdso_deleteDevice',commandsId, function (error, result) {})
              }
              else {
                times++
                if (times < 5){
                  setTimeout(function(){getResource(resourceIndex)}, 1000); // check again in a second
                } else{
                  localServiceStory.endpoints[resourceIndex].commands = ["Error retriving commands. XvcCommands object should be deleted."]
                  Session.set('serviceStory', localServiceStory);
                }
              }
            })
          }
          getResource(index)
        })
        })(index);
      }
    },
    'submit form': function(event, template) {
      var localServiceStory = Session.get("serviceStory")
      for (index = 0; index < localServiceStory.endpoints.length; ++index) {
        // localServiceStory.endpoints[index].ui.result = true
        Meteor.call("mdso_createCienaService", localServiceStory.endpoints[index].bpo, function (error, result) {
        })
      }
      Session.set('serviceStory', localServiceStory);
      Session.set('serviceID',{"label":Session.get('serviceStory').endpoints[0].bpo.label});
			Router.go('ciena_service_detail', {id : Session.get('serviceStory').endpoints[0].bpo.label});
    },    
    'click .device-add': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints.push(
      {"bpo":{
        "properties": {
          "device": "select" + (parseInt(localServiceStory.endpoints.length) + 1) ,
          "cosId": "EVC",
          "unis": [{
            "id": "1",
            "cosCfg": scosCfg
          }],
          "innis": [{
            "id": ""
          }]
        }
      }
      })

      Session.set('serviceStory', localServiceStory);
    },    
    'input #serviceName': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints.forEach(function (endpoint) {
        endpoint.bpo.label = event.currentTarget.value
        endpoint.bpo.properties.id = event.currentTarget.value
      }, this);
      Session.set('serviceStory', localServiceStory);

    },
    'change #classOfServiceName': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints.forEach(function (endpoint) {
        if (endpoint.bpo.properties.unis) {
          endpoint.bpo.properties.unis.forEach(function (uni) {
            uni.cosCfg[0].classOfServiceName = event.currentTarget.value
          }, this)
        }
        if (endpoint.bpo.properties.ennis) {
          endpoint.bpo.properties.ennis.forEach(function (enni) {
            enni.cosCfg[0].classOfServiceName = event.currentTarget.value
          }, this)
        }
      }, this);
      Session.set('serviceStory', localServiceStory);
    },
    'change .untagged-id': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints[event.currentTarget.id].bpo.properties.unis[0].ceVlanMap.untagged = event.currentTarget.checked
      Session.set('serviceStory', localServiceStory);
    },    
    'input .l2cp-id': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints[event.currentTarget.id].bpo.properties.unis[0].tunnelMethod = event.currentTarget.value
      Session.set('serviceStory', localServiceStory);
    },    
    'input .enni-id': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints[event.currentTarget.id].bpo.properties.ennis[0].id = event.currentTarget.value
      Session.set('serviceStory', localServiceStory);
    },    
    'input .tpid-id': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints[event.currentTarget.id].bpo.properties.ennis[0].tpid = event.currentTarget.value
      Session.set('serviceStory', localServiceStory);
    },
    'input .uni-id': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints[event.currentTarget.id].bpo.properties.unis[0].id = event.currentTarget.value
      Session.set('serviceStory', localServiceStory);
    },
    'input .enni-id': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints[event.currentTarget.id].bpo.properties.ennis[0].id = event.currentTarget.value
      Session.set('serviceStory', localServiceStory);
    },
    'input .ctag-id': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints[event.currentTarget.id].bpo.properties.unis[0].ceVlanMap.vlans = event.currentTarget.value
      Session.set('serviceStory', localServiceStory);
    },
    'input .device-id': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints[event.currentTarget.id].bpo.properties.device = event.currentTarget.value

      Meteor.call("mdso_getCienaInterfaces", event.currentTarget.value, function (error, result) {
        if (result) {
          localServiceStory.endpoints[event.currentTarget.id].ui = result
          localServiceStory.endpoints[event.currentTarget.id].bpo.properties.innis[0].id = localServiceStory.endpoints[event.currentTarget.id].ui.innis[0]      
          Session.set('serviceStory', localServiceStory);
        } else{
          alert("Failed to retrieve")
        }
      });
    },
    'input .stag-id': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints[event.currentTarget.id].bpo.properties.innis[0].stag = parseInt(event.currentTarget.value)
      Session.set('serviceStory', localServiceStory);
    },
    'input .inni-id': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints[event.currentTarget.id].bpo.properties.innis[0].id = event.currentTarget.value
      Session.set('serviceStory', localServiceStory);
    },

    'change #ingressCir': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints.forEach(function (endpoint) {
        if (endpoint.bpo.properties.unis) {
          endpoint.bpo.properties.unis.forEach(function (uni) {
            uni.cosCfg[0].ingressCir = parseInt(event.currentTarget.value)
          }, this)
        }
        if (endpoint.bpo.properties.ennis) {
          endpoint.bpo.properties.ennis.forEach(function (enni) {
            enni.cosCfg[0].ingressCir = parseInt(event.currentTarget.value)
          }, this)
        }

      }, this);
      Session.set('serviceStory', localServiceStory);

    },    
    'change #RealTime': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints.forEach(function (endpoint) {
        if (endpoint.bpo.properties.unis) {
          endpoint.bpo.properties.unis.forEach(function (uni) {
            uni.cosCfg[0].ingressCir = parseInt(event.currentTarget.value)
          }, this)
        }
      }, this);
      Session.set('serviceStory', localServiceStory);
    },
    'change #Interactive': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints.forEach(function (endpoint) {
        if (endpoint.bpo.properties.unis) {
          endpoint.bpo.properties.unis.forEach(function (uni) {
            uni.cosCfg[1].ingressCir = parseInt(event.currentTarget.value)
          }, this)
        }
      }, this);
      Session.set('serviceStory', localServiceStory);
    },    
    'change #BusinessCritical': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints.forEach(function (endpoint) {
        if (endpoint.bpo.properties.unis) {
          endpoint.bpo.properties.unis.forEach(function (uni) {
            uni.cosCfg[2].ingressCir = parseInt(event.currentTarget.value)
          }, this)
        }
      }, this);
      Session.set('serviceStory', localServiceStory);
    },    
    'change #NonCritical': function (event, template) {
      var localServiceStory = Session.get("serviceStory")
      localServiceStory.endpoints.forEach(function (endpoint) {
        if (endpoint.bpo.properties.unis) {
          endpoint.bpo.properties.unis.forEach(function (uni) {
            uni.cosCfg[3].ingressCir = parseInt(event.currentTarget.value)
          }, this)
        }
      }, this);
      Session.set('serviceStory', localServiceStory);
    },    
    'change #cosID': function (e, t) {
      var localServiceStory = Session.get("serviceStory")
      if (e.target.value == "PCP") {
        localServiceStory.cosId = "PCP"
        for (i = 0; i < localServiceStory.endpoints.length; ++i) {
          localServiceStory.endpoints[i].cosId = "PCP"
          if (localServiceStory.endpoints[i].bpo.properties.unis) {
            for (index = 0; index < localServiceStory.endpoints[i].bpo.properties.unis.length; ++index) {
              localServiceStory.endpoints[i].bpo.properties.unis[index].cosCfg = mcosCfg
            }
          }
        }
        localServiceStory.cosCfg = mcosCfg
      }
      if (e.target.value == "EVC") {
        localServiceStory.cosId = "EVC"
        for (i = 0; i < localServiceStory.endpoints.length; ++i) {
          localServiceStory.endpoints[i].cosId = "EVC"
          if (localServiceStory.endpoints[i].bpo.properties.unis) {
            for (index = 0; index < localServiceStory.endpoints[i].bpo.properties.unis.length; ++index) {
              localServiceStory.endpoints[i].bpo.properties.unis[index].cosCfg = scosCfg

            }
          }
        }
        localServiceStory.cosCfg = scosCfg
      }
      if (e.target.value == "DSCP") {
        localServiceStory.cosId = "DSCP"
        for (i = 0; i < localServiceStory.endpoints.length; ++i) {
          localServiceStory.endpoints[i].cosId = "DSCP"
          if (localServiceStory.endpoints[i].bpo.properties.unis) {
            for (index = 0; index < localServiceStory.endpoints[i].properties.unis.length; ++index) {
              localServiceStory.endpoints[i].bpo.properties.unis[index].cosCfg = mcosCfg
            }
          }
        }
        localServiceStory.cosCfg = mcosCfg
      }
      Session.set('serviceStory', localServiceStory);
    }
  });