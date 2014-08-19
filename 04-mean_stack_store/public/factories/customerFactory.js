sierraApp.factory('customerFactory', function($http){
	var factory={};
	var customers=[];
	var message;
	factory.errors=[];
	factory.getCustomers=function(callback){
		$http.get('/api/customers').success(function(data){
			customers=data;
			callback(customers);
		}).error(function(data){
			console.log('getCustomers error:', data);
		});
	}
	factory.createCustomer=function(customer){
		factory.errors=[];
		message="";
		$http.post('/api/customers', customer).success(function(data){
			customers.push(data);
			factory.errors=[];
			customer.name="";
			customer.email="";
		}).error(function(data){
			// creating error messages for duplicate entry
			console.log(data);
			if(data.code&&(data.code===11000||data.code===11001)){
				var prestring=".$";
				var poststring="_1";
				var start=data.err.indexOf(prestring)+prestring.length;
				var end=data.err.indexOf(poststring);
				var problem_input=data.err.slice(start, end);
				message="Customer "+problem_input+" is a duplicate.  (No duplicates allowed.)";
				factory.errors.push(message);
			}
			// creating error messages for omitted entry
			if(data.message){
				for(var index in data.errors){
					if(data.errors[index].type==="required"){					
						factory.errors.push(data.errors[index].message);
					}
					if(data.errors[index].type==="user defined"){					
						factory.errors.push(data.errors[index].message);
					}
				}
			}
		});
	}
	factory.deleteCustomer=function(id){
		$http.delete('/api/customers/'+id).success(function(data){
			for(var index in customers){
				if(customers[index]._id===id){
					customers.splice(index, 1);
				}
			}
		}).error(function(data){
			console.log('deleteCustomer error:', data);
		});
	}
	return factory;
});
