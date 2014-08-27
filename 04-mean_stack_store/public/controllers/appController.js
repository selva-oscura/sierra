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

sierraApp.filter('lastXDays', function(){
	return function(records, x){
		var filtered_records=[];
		for(i in records){		
			var now = new Date();
			var today_start = new Date((now.getMonth()+1)+" "+now.getDate()+" "+now.getFullYear());
			var then = new Date(records[i].created);
			var total_days=((today_start-then)/(1000*60*60*24));
			if(total_days<=x){
				filtered_records.push(records[i]);
			}
		}
		return filtered_records;
	}
});