sierraApp.factory('orderFactory', function($http){
	var factory={};
	var customers=[];
	var products=[];
	var orders=[];
	var message;
	factory.errors=[];
	// factory.orders=[
	// 	{customer_name:'Michael Choi', product:'something', quantity:1, created:'2014-04-03'},
	// 	{customer_name:'John Supsupin', product:'something else', quantity:4, created:'2014-04-03'},
	// 	{customer_name:'Trey Villafane', product:'another thing', quantity:793, created:'2014-04-01'},
	// 	{customer_name:'India Meisner', product:'stuff', quantity:2, created:'2014-03-15'}
	// ];
	// factory.products=[
	// 	{name:'Nike Shoes'},
	// 	{name:'Black Belts'},
	// 	{name:'Ice Cream'},
	// 	{name:'Candles'}
	// ];
	// factory.customers=[
	// 	{name:'Michael Choi'},
	// 	{name:'John Supsupin'},
	// 	{name:'Trey Villafane'},
	// 	{name:'India Meisner'}
	// ];
	factory.getCustomers=function(callback){
		$http.get('/api/customers').success(function(data){
			customers=data;
			callback(customers);
		}).error(function(data){
			console.log('getCustomers error:', data);
		});
	}
	factory.getProducts=function(callback){
		$http.get('/api/products').success(function(data){
			products=data;
			callback(products);
		}).error(function(data){
			console.log('getProducts error', data);
		});
	}
	factory.getOrders=function(callback){
		$http.get('/api/orders').success(function(data){
			orders=data;
			for(i in orders){
				var now = new Date();
				var elapsed = "";
				var days=Math.floor(now-orders[i].created)/1000*60*60*24;
			// 	// if(now.getFullYear()===orders[i].created.getFullYear()&&now.getMonth()===orders[i].created.getMonth()&&now.getDate===orders[i].created.getDate()){
			// 	// 	var hours=Math.floor(now-orders[i].created/1000*60*60);
			// 	// 	if(hours===0){
			// 	// 		elapsed="in the last hour";						
			// 	// 	}else if(hours===1){
			// 	// 		elapsed="1 hour ago";
			// 	// 	}else{
			// 	// 		elapsed=hours+" hours ago";
			// 	// 	}
			// 	// }else{
			// 	// 	var days=Math.ceil(now-orders[i].created/1000*60*60*24);
			// 	// 	if(days===1){
			// 	// 		elapsed="yesterday";
			// 	// 	}else if(days<7){
			// 	// 		elapsed=days+" days ago";
			// 	// 	}else if(days<14){
			// 	// 		elapsed="1 week ago"
			// 	// 	}
				console.log(now, orders[i].created);
				orders[i].elapsed=elapsed;
			// 	}
			}
			callback(orders);
		}).error(function(data){
			console.log('getOrders error', data);
		});
	}
	factory.createOrder = function(order){
		factory.errors=[];
		message="";
		$http.post('/api/orders', order).success(function(data){
			orders.push(data);
			order.customer_name='';
			order.product_name='';
			order.quantity='';
			factory.errors=[];
		}).error(function(data){
			console.log(data);
			//creating error messages for omitted entry
			if(data.message){
				for(var index in data.errors){
					if(data.errors[index].type==="required"){
						factory.errors.push(data.errors[index].message);
					}
					if(data.errors[index].type==="min"){
						var prestring="allowed value (";
						var poststring=").";
						var start=data.errors[index].message.indexOf(prestring)+prestring.length;
						var end=data.errors[index].message.indexOf(poststring);
						var problem_input=data.errors[index].message.slice(start, end);
						message="The minimum for "+data.errors[index].path+" is "+problem_input+". Please enter a valid "+data.errors[index].path+".";
						factory.errors.push(message);
					}
				}
			}
		});
	}
	factory.deleteOrder=function(id){
		$http.delete('/api/orders/'+id).success(function(data){
			for(var index in orders){
				if(orders[index]._id===id){
					orders.splice(index, 1);
				}
			}
		}).error(function(data){
			console.log('deleteOrder error:', data);
		});
	}
	return factory;
});
