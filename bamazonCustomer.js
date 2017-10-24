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
	console.log('Welcome to Bamazon! Your Customer Id is: ' + connection.threadId);
	showProducts();
});

// Function to show all avaiable products
function showProducts() {
	console.log('Below are our avaiable items:');
	console.log('------------------------------------------------');
	console.log('#' + ' | ' + 'Product' + ' | ' + 'Department' + ' | ' + 'Price' + ' | ' + 'Quantity');
	console.log('------------------------------------------------');
	connection.query('SELECT * FROM PRODUCTS', function(error, results) {
		if (error) throw error;

		var itemsAvailable = results.length;
		var itemsLeft = results[itemRequested].stock_quantity;
		
		// loop through products
		for (i = 0; i < results.length; i++) {
			console.log(results[i].item_id +
				' | ' + results[i].product_name +
				' | ' + results[i].department_name +
				' | ' + results[i].price +
				' | ' + results[i].stock_quantity);
		}
		console.log('------------------------------------------------');

		// function for purchasing products
		buyProduct(itemsAvailable);

		// end connection
		connection.end();
	});
}

function buyProduct(itemsAvailable, itemsLeft) {
	var itemRequested;

	inquirer.prompt([
		{
			type: 'input',
			name: 'buy',
			message: 'Which product would you like to buy? Please enter the Product Number:',
			validate: function(input1) {
				var itemRequested = input1;

				if (input1 <= itemsAvailable) {
					console.log('\nNice selection!');
					return true;
				} else {
					console.log('\nPlease enter a valid Product Number!')
				}
			}
		},
		{
			type: 'input',
			name: 'howMany',
			message: 'How many would you like to purchase?',
			validate: function(input) {
				if (input <= itemsLeft) {
					return true;
				} else {
					console.log('\nThere are not that many avaiable. Please order a smaller amount.')
				}
			}
		}
		]).then(function(answer) {
			// console.log(answer);
		});
}



