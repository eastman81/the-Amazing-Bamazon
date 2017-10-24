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
	console.log('connected as id ' + connection.threadId);
	showProducts();
	// connection.end();
});

// Function to show all avaiable products
function showProducts() {
	console.log('Items for sale:');
	console.log('-----------------------');
	connection.query('SELECT * FROM PRODUCTS', function(error, results) {
		if (error) throw error;
		console.log(results);
		connection.end();
	});
}