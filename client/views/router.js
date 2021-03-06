Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var freeRoutes = [
	"home",
	"huawei",
	"ciena",
	"huawei_devices",
	"huawei_device",
	"huawei_services",
	"huawei_service_detail",
	"ciena_devices",
	"ciena_device",
	"ciena_downer_device",
	"ciena_downer_devices",
	"ciena_services",
	"ciena_service_detail",
	"ciena_service_add",
	"ciena_service_story"
];

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		$("body").addClass("wait");
		this.render("loading");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.map(function () {

	this.route("home", {path: "/", controller: "HomeController"});
	this.route("huawei", {path: "/huawei", controller: "HuaweiController"});
	this.route("ciena", {path: "/ciena", controller: "CienaController"});
	this.route("huawei_devices", {path: "/huawei_devices", controller: "HuaweiDevicesController"});
	this.route("huawei_device", {path: "/huawei_device/:id", controller: "HuaweiDeviceController"});
	this.route("huawei_services", {path: "/huawei_services", controller: "HuaweiServicesController"});
	this.route("huawei_service_detail", {path: "/huawei_service_detail/:id", controller: "HuaweiServiceDetailController"});
	this.route("ciena_devices", {path: "/ciena_devices", controller: "CienaDevicesController"});
	this.route("ciena_device", {path: "/ciena_device/:id", controller: "CienaDeviceController"});
	this.route("ciena_downer_devices", {path: "/ciena_downer_devices", controller: "CienaDownerDevicesController"});
	this.route("ciena_services", {path: "/ciena_services", controller: "CienaServicesController"});
	this.route("ciena_service_detail", {path: "/ciena_service_detail/:id", controller: "CienaServiceDetailController"});
	this.route("ciena_service_story", {path: "/ciena_service_story", controller: "CienaServiceStoryController"});
	this.route("ciena_service_add", {path: "/ciena_service_add", controller: "CienaServiceAddController"});
});
