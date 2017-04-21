CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
  item_id INT(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50),
  price DECIMAL(10,2),
  stock_quantity INT(11),
  product_sales DECIMAL(10,2),
  PRIMARY KEY (item_id)
);

CREATE TABLE departments(
  department_id INT(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  overhead_costs DECIMAL(10,2),
  total_sales INT(11),
  PRIMARY KEY (department_id)
);
