var sierraApp = angular.module('sierraApp', ['ngRoute']);
	sierraApp.config(function ($routeProvider) {
	$routeProvider
	.when('/customers',
	{
		templateUrl: './partials/customers.htm',
		controller: 'customerController'
	})
	.when('/orders',
	{
		templateUrl: './partials/orders.htm',
		controller: 'orderController'
	})
	.when('/products',
	{
		templateUrl: './partials/products.htm',
		controller: 'productController'
	})	.when('/',
	{
		templateUrl: './partials/index.htm'
	})
	.otherwise({
		redirectTo: '/'
	});
});

sierraApp.controller('MenuCtrl', function($scope, $location){
	$scope.menuClass = function(page){
		var current = $location.path().substring(1);
		return page=== current ? "active" : "";
		alert(current);
	};
});