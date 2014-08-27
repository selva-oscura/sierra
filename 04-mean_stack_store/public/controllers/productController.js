var productList=angular.module('productList', []);
sierraApp.controller('productController', function($scope, productFactory){
	//deprecated after shifting from static data to data from database
	// $scope.products=productFactory.products;
	$scope.products=productFactory.getProducts(function(data){
		$scope.products=data;
	});
	$scope.errors=productFactory.errors;
	$scope.addProduct = function(){
		productFactory.createProduct($scope.new_product);
		$scope.errors=productFactory.errors;
	}
	$scope.removeProduct = function(id){
		productFactory.deleteProduct(id);
	}
	$( document ).ready(function() {
		var table_width=$('table').width();
		$('#search')
			.css('margin-right', (890-table_width));
	});
});
