// My NPM sources 
var mysql = require('mysql');
var inquirer = require('inquirer');

// Connection to database
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	database: 'bamazon_db'
});

connection.connect(function(error) {
	if (error) throw error;
	console.log('------------------------------------------------');
	console.log('Welcome to Bamazon Mr. Manager! Your Manager Id is: ' + connection.threadId);
	whatToDo();
});

// Find out what Mr. Manager wants to do
function whatToDo() {
	inquirer.prompt([
		{
			type: 'list',
			name: 'task',
			message: 'What would you like to do Mr. Manager',
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
		}
		]).then(function(answer) {
			if (answer.task === 'View Products for Sale') {
				showProducts();
			} else if (answer.task === 'View Low Inventory') {
				showLowInventory();
			} else if (answer.task === 'Add to Inventory') {
				addToInventory();
			} else if (answer.task === 'Add New Product') {
				addNewProduct();
			} else if (answer.task === 'Exit') {
				connection.end();
			}
		});
}

// Function to show all avaiable products
function showProducts() {
	console.log('Below are our avaiable items:');
	console.log('------------------------------------------------');
	console.log('#' + ' | ' + 'Product' + ' | ' + 'Department' + ' | ' + 'Price' + ' | ' + 'Quantity');
	console.log('------------------------------------------------');
	connection.query('SELECT * FROM products', function(error, results) {
		if (error) throw error;

		// use the full array of results, and then call what I need from it when I am in my functions later down
		var itemsAvailable = results;
		
		// loop through products
		for (i = 0; i < results.length; i++) {
			console.log(results[i].item_id +
				' | ' + results[i].product_name +
				' | ' + results[i].department_name +
				' | ' + results[i].price +
				' | ' + results[i].stock_quantity);
		}
		console.log('------------------------------------------------');

		whatToDo()
	});
}

// Function to show low inventory (anything with stock_quantity under 5)
function showLowInventory() {
	connection.query('SELECT product_name FROM products WHERE stock_quantity <= 5', function(error, results) {
		if (error) throw error;

		console.log('The following items have less than 5 avaiable in stock:');
		
		for (i = 0; i < results.length; i++) {
			console.log(results[i].product_name);
		}
		
		whatToDo();
	});
}

// Function to add more stock to any product
function addToInventory() {
	console.log('work in progess')
	whatToDo()
}

// Function to add a new product
function addNewProduct() {
	console.log('work in progess')
	whatToDo()
}

