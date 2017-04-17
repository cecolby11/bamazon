CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
  item_id INT(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50),
  department_name VARCHAR(50),
  price DECIMAL(10,2),
  stock_quantity INT(11),
  PRIMARY KEY (item_id)
);
