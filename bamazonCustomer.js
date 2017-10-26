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

		// function for purchasing products
		buyProduct(itemsAvailable);
	});
}

// Purchasing function
function buyProduct(itemsAvailable) {
	var itemNumber;

	inquirer.prompt([
		{
			type: 'input',
			name: 'buy',
			message: 'Which product would you like to buy? Please enter the Product Number:',
			validate: function(input) {
				itemNumber = input;

				if (input <= itemsAvailable.length) {
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
				// find the quantity of the requested item
				for (i = 0; i < itemsAvailable.length; i++) {
					var itemName = itemsAvailable[itemNumber -1].product_name;
					var itemQuantity = itemsAvailable[itemNumber -1].stock_quantity;
				}

				if (input <= itemQuantity) {
					return true;
				} else {
					console.log("\nThere are not enough of that item avaiable. Please select a smaller number to purchase");
				}
			}
		}
		]).then(function(answer) {
			var itemName = itemsAvailable[itemNumber -1].product_name;
			var itemQuantity = itemsAvailable[itemNumber -1].stock_quantity;
			var itemPrice = itemsAvailable[itemNumber -1].price;
			var itemId = answer.buy;
			var numberPurchased = answer.howMany;

			console.log("Congrats! You just bought " + numberPurchased + " of " + itemName + "!");

			// Subtract number purchased from stock, find the total price for customer
			var updateStock = itemQuantity - numberPurchased;
			var customerPrice = itemPrice * numberPurchased;

			connection.query(
				'UPDATE products SET ? WHERE ?',
				[
					{
						stock_quantity: updateStock
					},
					{
						item_id: itemId
					}
				],
				function(error, results) {
					if (error) throw error;
					console.log('There are ' + updateStock + ' ' + itemName + 's remaining.');
					console.log('Total cost: $' + customerPrice);

					whatNext();
				});
		});
}

// See what the customer wants to do next
function whatNext() {
	inquirer.prompt([
		{
			type: 'list',
			name: 'next',
			message: 'What would you like to do next?',
			choices: ['Purchase another item', 'Exit Bamazon']
		}
		]).then(function(answer) {
			if (answer.next === 'Purchase another item') {
				showProducts();
			} else {
				// End connection
				connection.end();
			}
		});
}