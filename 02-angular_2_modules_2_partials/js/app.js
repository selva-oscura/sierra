var sierraApp = angular.module('sierraApp', ['ngRoute']);
	sierraApp.config(function ($routeProvider) {
	$routeProvider
	.when('/customers',
	{
		templateUrl: 'partials/customers.htm',
		controller: 'customerController'
	})
	.when('/orders',
	{
		templateUrl: 'partials/orders.htm',
		controller: 'orderController'
	})
	.when('/',
	{
		templateUrl: 'partials/index.htm'
		// controller: 'orderController'
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

var customerList=angular.module('customerList', []);
sierraApp.factory('customerFactory', function(){
	var factory={};
	factory.customers=[
		{name:'Michael Choi', created:'2014-04-02T20:15:00.982Z'},
		{name:'John Supsupin', created:'2014-04-03T20:15:33.982Z'},
		{name:'India Meisner', created:'2014-03-15T20:14:33.982Z'},
		{name:'Trey Villafane', created:'2014-04-01T20:02:33.982Z'}
	];
	// factory.getCustomers=function(){
	// 	return customers;
	// };
	factory.createCustomer = function(info){
		var err=0;
		//check for duplicate entries for customer.name
		for(x in factory.customers){
			// console.log(customers[x].name, info.name);
			if(factory.customers[x].name===info.name){
				err=1;
				console.log('err');
			}
		}
		//if no errors, create customer record
		if(err===0){					
			var date = new Date();
			console.log(date);
			factory.customers.push({
				name: info.name,
				created: date
			})
			//reset name field in form and message (error-reporting) area under form
			info.name='';
			info.message='';
		}
		//else (= presence of errors), send error message
		else{
			info.name='error';
			info.message='Error!  That customer is already in our records.';
		}
	}
	factory.deleteCustomer=function($index){
		factory.customers.splice($index, 1);
		// return customers;
	}
	return factory;
});
sierraApp.controller('customerController', function($scope, customerFactory){
	// $scope.customers=customerFactory.getCustomers();
	$scope.customers=customerFactory.customers;
	$( document ).ready(function() {
		var table_width=$('table').width();
		$('#search')
			.css('margin-right', (894-table_width));
	});
	$scope.addCustomer = function(){
		customerFactory.createCustomer($scope.new_customer);
	}
	$scope.removeCustomer = function($index){
		customerFactory.deleteCustomer($index);
	}
});

var orderList=angular.module('orderList', []);
sierraApp.factory('orderFactory', function(){
	var factory={};
	factory.orders=[
		{customer_name:'Michael Choi', product:'something', quantity:1, created:'2014-04-03'},
		{customer_name:'John Supsupin', product:'something else', quantity:4, created:'2014-04-03'},
		{customer_name:'Trey Villafane', product:'another thing', quantity:793, created:'2014-04-01'},
		{customer_name:'India Meisner', product:'stuff', quantity:2, created:'2014-03-15'}
	];
	factory.products=[
		{name:'Nike Shoes'},
		{name:'Black Belts'},
		{name:'Ice Cream'},
		{name:'Candles'}
	];
	factory.customers=[
		{name:'Michael Choi'},
		{name:'John Supsupin'},
		{name:'Trey Villafane'},
		{name:'India Meisner'}
	];
	// factory.getCustomers=function(){
	// 	return customers;
	// };
	factory.createOrder = function(info){
		var d=new Date();
		var year = d.getFullYear().toString();
		var month = (d.getMonth()+1).toString();
		if(month.length<2){month="0"+month};
		var day = (d.getDate()).toString();
		if(day.length<2){day="0"+day};
		var date=year+'-'+month+'-'+day;
		factory.orders.push({
			customer_name: info.customer_name,
			product: info.product,
			quantity: info.quantity,
			created: date
		});
		//reset name field in form and message (error-reporting) area under form
		info.customer_name='';
		info.product='';
		info.quantity='';
	}
	factory.deleteOrder=function($index){
		factory.orders.splice($index, 1);
		// return customers;
	}
	return factory;
});
sierraApp.controller('orderController', function($scope, orderFactory){
	// $scope.customers=customerFactory.getCustomers();
	$scope.orders=orderFactory.orders;
	$scope.customers=orderFactory.customers;
	$scope.products=orderFactory.products;
	$( document ).ready(function() {
		var table_width=$('table').width();
		$('#search')
			.css('margin-right', (894-table_width));
	});
	$scope.addOrder = function(){
		orderFactory.createOrder($scope.new_order);
	}
	$scope.removeOrder = function($index){
		orderFactory.deleteOrder($index);
	}
});