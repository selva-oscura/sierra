var customerList=angular.module('customerList', []);
// var customerFactory = require('./factories/customerFactory.js');  //trying one approach
// require('./factories/customerFactory.js'); //trying a different approach


sierraApp.controller('customerController', function($scope, customerFactory){
	//deprecated after shifting from static data to data from database
	// $scope.customers=customerFactory.customers;
	$scope.customers=customerFactory.getCustomers(function(data){
		$scope.customers=data;
	});
	$scope.errors=customerFactory.errors;
	$scope.addCustomer = function(){
		customerFactory.createCustomer($scope.new_customer);
		$scope.errors=customerFactory.errors;
	}
	$scope.removeCustomer = function(id){
		customerFactory.deleteCustomer(id);
	}
	$( document ).ready(function() {
		var table_width=$('table').width();
		$('#search')
			.css('margin-right', (890-table_width));
	});
});