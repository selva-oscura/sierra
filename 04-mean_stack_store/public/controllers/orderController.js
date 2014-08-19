var orderList=angular.module('orderList', []);
sierraApp.controller('orderController', function($scope, orderFactory){
	//deprecated after shifting from static data to data from database
	// $scope.orders=orderFactory.orders;
	// $scope.customers=orderFactory.customers;
	// $scope.products=orderFactory.products;
	$scope.customers=orderFactory.getCustomers(function(data){
		$scope.customers=data;
	});
	$scope.products=orderFactory.getProducts(function(data){
		$scope.products=data;
	});
	$scope.orders=orderFactory.getOrders(function(data){
		$scope.orders=data;
	});
	$scope.errors=orderFactory.errors;
	$scope.addOrder = function(){
		orderFactory.createOrder($scope.new_order);
		$scope.errors=orderFactory.errors;
	}
	$scope.removeOrder = function(id){
		orderFactory.deleteOrder(id);
	}
	$( document ).ready(function() {
		var table_width=$('table').width();
		$('#search')
			.css('margin-right', (890-table_width));
	});
});