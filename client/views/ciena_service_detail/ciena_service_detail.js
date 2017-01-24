Template.CienaServiceDetail.rendered = function () {
  Session.set('endpoints', {});
  Session.set('endpointsDetail', {});

};
// Template.CienaServiceDetail.destroyed = function () {
//   Session.set('endpoints', {});
//   Session.set('endpointsDetail', {});
//   Session.set("serviceID","");
// };

Template.CienaServiceDetail.helpers({
  'serviceID': function () {return Session.get("serviceID");
  }
});

Template.CienaServiceDetailEndpoints.events({
  'click .services-delete': function (event, target) {
    alert(JSON.stringify(this))
    $('#serviceDeleteConfirmModal').modal('show');
  },
  'click .endpoint-remove': function (event, target) {
    var localservice = Session.get("endpoints")
    delService = localservice[event.currentTarget.id]
    Meteor.call("mdso_removeEndpoint", delService, function (error, result) {});
  }
});

Template.CienaServiceDetailEndpoints.helpers({
  'serviceID': function () {return Session.get("serviceID");
  },
  'endpoints': function () {return Session.get("endpoints");
  },
  'endpointsDetail': function () {return Session.get("endpointsDetail");
  }
});
var run_every_second;

Template.CienaServiceDetailEndpoints.destroyed = function () {
  Meteor.clearInterval(run_every_second);
};

Template.CienaServiceDetailEndpoints.created = function () {

    graph = {
    "nodes": [
      // {"name":"a","width":60,"height":40}
    ],
    "links": [
      // {"source":1,"target":2}
    ],
    "groups": [
      // {"leaves":[0], "groups":[1]},
      // {"leaves":[1,2]},
      // {"leaves":[3,4]}
    ]
  };
  var localserviceID = Session.get("serviceID")
  Meteor.call("mdso_getResourcesByResourceTypeId", "raciena6x.resourceTypes.XvcFragment", "&q=label:" + localserviceID.label, function (error, result) {
    if (result) {
      Session.set('endpoints', result);
      localEndpointsDetail = result
      for (let endpoint of localEndpointsDetail) {
        Meteor.call("mdso_getResourceById", endpoint.properties.device, function (error, result) {
          endpoint.properties.ip = result.properties.connection.hostname
          Session.set('endpointsDetail', localEndpointsDetail);
          Session.set('endpoints', localEndpointsDetail);
          Meteor.call("mdso_DeviceDetailByIP", result.properties.connection.hostname, function (error, result) {
            endpoint.properties.hostname = result[0].properties.hostname
            Session.set('endpointsDetail', localEndpointsDetail);
            Session.set('endpoints', localEndpointsDetail);})
        })
      }

      localEndpointsDetail.forEach(function (endpoint, i) {
        console.log(endpoint)
        graph.nodes.push({"name":endpoint.properties.device,"id":endpoint.properties.device,"width":350,"height":40})
        if (endpoint.properties.unis){
          graph.nodes.push({"name":"uni " +endpoint.properties.unis[0].id,"id":endpoint.properties.unis[0].uniId,"width":70,"height":40})
        }
        if (endpoint.properties.ennis){
          graph.nodes.push({"name":"enni " +endpoint.properties.enis[0].id,"id":endpoint.properties.enis[0].enniId,"width":70,"height":40})
        }
        graph.nodes.push({"name":"inni " +endpoint.properties.innis[0].id,"id":endpoint.properties.innis[0].inniId,"width":70,"height":40})
        graph.groups.push({"leaves":[i*3,i*3+1,i*3+2]})
      }, this);
      graph.nodes.push({"name":"Vodafone core","width":160,"height":40})
      
      for (i=2;i<graph.nodes.length;i=i+3){
        graph.links.push({"source":i,"target":graph.nodes.length-1})
      }
      console.log(graph)
      var width = 960,
        height = 500;
      var color = d3.scale.category20();
      var d3cola = cola.d3adaptor()
        .linkDistance(100)
        .avoidOverlaps(true)
        .handleDisconnected(false)
        .size([width, height]);

      var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

      var nodeRadius = 5;

      d3cola
        .nodes(graph.nodes)
        .links(graph.links)
        .groups(graph.groups)
        .start();

      var group = svg.selectAll(".group")
        .data(graph.groups)
        .enter().append("rect")
        .attr("rx", 8).attr("ry", 8)
        .attr("class", "group")
        .style("fill", function (d, i) {return color(i);})
        .call(d3cola.drag);

      var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link");

      var pad = 3;

      var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("rect")
        .attr("class", "node")
        .attr("width", function (d) {return d.width - 2 * pad;})
        .attr("height", function (d) {return d.height - 2 * pad;})
        .attr("rx", 5).attr("ry", 5)
        .style("fill", function (d) {return color(graph.groups.length);})
        .call(d3cola.drag);
      var label = svg.selectAll(".label")
        .data(graph.nodes)
        .enter().append("text")
        .attr("class", "label")
        .text(function (d) {return d.name;})
        .call(d3cola.drag);
      node.append("title")
        .text(function (d) {return d.name;});

      d3cola.on("tick", function () {
        link.attr("x1", function (d) {return d.source.x;})
          .attr("y1", function (d) {return d.source.y;})
          .attr("x2", function (d) {return d.target.x;})
          .attr("y2", function (d) {return d.target.y;});

        node.attr("x", function (d) {return d.x - d.width / 2 + pad;})
          .attr("y", function (d) {return d.y - d.height / 2 + pad;});

        group.attr("x", function (d) {return d.bounds.x;})
          .attr("y", function (d) {return d.bounds.y;})
          .attr("width", function (d) {return d.bounds.width();})
          .attr("height", function (d) {return d.bounds.height();});

        label.attr("x", function (d) {return d.x;})
          .attr("y", function (d) {
            var h = this.getBBox().height;return d.y + h / 4;});
      });



    }
  });
  run_every_second = Meteor.setInterval(() => {
    var localserviceID = Session.get("serviceID")
    var localEndpointsDetail = Session.get("endpointsDetail")
    Meteor.call("mdso_getResourcesByResourceTypeId", "raciena6x.resourceTypes.XvcFragment", "&q=label:" + localserviceID.label, function (error, result) {
      if (result) {
        localEndpoint = result
        localEndpoint.forEach(function (endpoint, i) {
          endpoint.properties.ip = localEndpointsDetail[i].properties.ip
          endpoint.properties.hostname = localEndpointsDetail[i].properties.hostname
        }, this);
        Session.set('endpoints', localEndpoint);
      }
    });
  }, 1000);




};
Template.CienaServiceDetailEndpoints.rendered = function () {
  endpoints = Session.get("endpointsDetail")
 

}
Template.serviceDeleteConfirmModal.events({
  'click .__cancel': function (e, t) {
    Modal.hide();
  },

  'click .__delete': function (e, t) {
    var self = this;
    Meteor.call('cart.removeLineItem', {
      cartId: self.product.parent._id,
      lineItemId: self.product._id,
    }, function (err) {
      Modal.hide();
      if (!err) {
        toastr.success('Item removed.', 'Success');
        analytics.track('Deleted a cart line item');
      } else {
        toastr.error(err.message, 'Error removing item');
      }
    });
  },
});