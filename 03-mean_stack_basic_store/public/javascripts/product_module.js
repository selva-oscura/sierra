var productList=angular.module('productList', []);
sierraApp.factory('productFactory', function($http){
	var factory={};
	var products=[];
	var message;
	factory.errors=[];
	factory.getProducts=function(callback){
		$http.get('/api/products').success(function(data){
			products=data;
			callback(products);
		}).error(function(data){
			console.log('getProducts error', data);
		});
	}
// factory.products=[
// 	{name:'Nike Shoes', created:'2014-09-02T20:15:00.982Z'},
// 	{name:'Black Belts', created:'2014-05-02T20:15:00.982Z'},
// 	{name:'Ice Cream', created:'2014-08-02T20:15:00.982Z'},
// 	{name:'Candles', created:'2014-03-02T20:15:00.982Z'}
// ];
	factory.createProduct = function(product){
		factory.errors=[];
		$http.post('/api/products', product).success(function(data){
			products.push(data);
			factory.errors=[];
			product.name="";
		}).error(function(data){
			// creating error messages for duplicate entry
			if(data.code&&(data.code===11000||data.code===11001)){
				var prestring=".$";
				var poststring="_1";
				var start=data.err.indexOf(prestring)+prestring.length;
				var end=data.err.indexOf(poststring);
				var problem_input=data.err.slice(start, end);
				message="Product "+problem_input+" is a duplicate.  (No duplicates allowed.)";
				factory.errors.push(message);
			}
			// creating error messages for omitted entry
			if(data.message){
				for(var index in data.errors){
					if(data.errors[index].type==="required"){					
						factory.errors.push(data.errors[index].message);
					}
				}
			}
		});
	}
	factory.deleteProduct=function(id){
		$http.delete('/api/products/'+id).success(function(data){
			for(var index in products){
				if(products[index]._id===id){
					products.splice(index, 1);
				}
			}
		}).error(function(data){
			console.log('deleteProduct error', data);
		});
	}
	return factory;
});
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
			.css('margin-right', (894-table_width));
	});
});