var mongoose = require('mongoose');  //this is the mongoose MODULE.
require('./mongoose.js'); //this is the mongoose.js FILE

//get the relevant model(s) from our mongoose.js file
var Customer = mongoose.model('Customer');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');
module.exports = function Routes(app){
	//GET Home page of app
	app.get('/', function(req,res){ 
		res.render('index', { title: 'Sierra' }); 
	}); 
	//GET index of all customers
	app.get('/api/customers', function(req,res){
		Customer.find({}, function(errors, results){
			res.json(results);
		});
	});
	//POST new customer 
	app.post('/api/customers', function(req, res){
		new_customer = new Customer(req.body);
		new_customer.save(function(errors){
			if(errors){
				res.status(400).json(errors);
				console.log('new_customer errors: ', errors);
			} else{
				res.json(new_customer);
				console.log('new_customer -- No errors');
			}
		});
	});
	//DELETE customer
	app.delete('/api/customers/:id', function(req, res){
		console.log('Deleting customer #'+req.params.id);
		Customer.remove({_id:req.params.id}, function(errors){
			if(errors){			
				res.status(400).json(errors);
				console.log('remove_customer_errors: ', errors);
			} else{
				Customer.find({}, function(errors, results){
					res.json(results);
				});
			}
		});
	});
	//GET index of all products
	app.get('/api/products', function(req,res){
		Product.find({}, function(errors, results){
			res.json(results);
		});
	});
	//POST new product 
	app.post('/api/products', function(req, res){
		new_product = new Product(req.body);
		new_product.save(function(errors){
			if(errors){
				res.status(400).json(errors);
				console.log('new_product errors: ', errors);
			} else{
				res.json(new_product);
				console.log('new_product -- No errors');
			}
		});
	});
	//DELETE product
	app.delete('/api/products/:id', function(req, res){
		console.log('Deleting product #'+req.params.id);
		Product.remove({_id:req.params.id}, function(errors){
			if(errors){			
				res.status(400).json(errors);
				console.log('remove_product_errors: ', errors);
			} else{
				Product.find({}, function(errors, results){
					res.json(results);
				});
			}
		});
	});
	//GET index of all orders
	app.get('/api/orders', function(req,res){
		Order.find({}, function(errors, results){
			res.json(results);
		});
	});
	//POST new order 
	app.post('/api/orders', function(req, res){
		new_order = new Order(req.body);
		new_order.save(function(errors){
			if(errors){
				res.status(400).json(errors);
				console.log('new_order errors: ', errors);
			} else{
				res.json(new_order);
				console.log('new_order -- No errors');
			}
		});
	});
	//DELETE order
	app.delete('/api/orders/:id', function(req, res){
		console.log('Deleting order #'+req.params.id);
		Order.remove({_id:req.params.id}, function(errors){
			if(errors){			
				res.status(400).json(errors);
				console.log('remove_order_errors: ', errors);
			} else{
				Order.find({}, function(errors, results){
					res.json(results);
				});
			}
		});
	});
};