sierraApp.factory('customerFactory', function($http){
	var factory={};
	var customers=[];
	var message;
	factory.errors=[];
	factory.getCustomers=function(callback){
		$http.get('/api/customers').success(function(data){
			customers=data;
			for(i in customers){
				var elapsed = "";
				var now = new Date();
				var then = new Date(customers[i].created)
				var today_start = new Date((now.getMonth()+1)+" "+now.getDate()+" "+now.getFullYear());
				if(then>today_start){
					console.log('today');
					var hours=((now-then)/(1000*60*60));
					if(hours<1){
						elapsed = "in the last hour";
					}else{
						elapsed="in the last "+Math.ceil(hours)+" hours";
					}
				}else{
					var total_days=((today_start-then)/(1000*60*60*24));
					if(total_days<1){
						elapsed="yesterday";
					}else{
						total_days=Math.ceil(total_days);
						var weeks=Math.floor(total_days/7);
						var days=total_days%7;
						if(weeks===1){
							elapsed=weeks+" week";
						}else if(weeks>1){
							elapsed=weeks+" weeks";
						}
						if(weeks>0&&days>0){
							elapsed+=", ";
						}
						if(days===1){
							elapsed+=days+" day";
						}
						else if(days>1){
							elapsed+=days+" days";
						}
						elapsed+=" ago";
					}
				}
				customers[i].elapsed=elapsed;
			}

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
