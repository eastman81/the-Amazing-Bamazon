DELETE DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100),
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(10),
	PRIMARY KEY (item_id)
);

SELECT * FROM products;