// =============
// DEPENDENCIES
// =============

var inquirer = require('inquirer');
var mysql = require('mysql');
var color = require('cli-color');
var Product = require('./product.js').Product;

// ===========
// CONNECTION
// ===========

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'Bamazon'
});

connection.connect(function(error){
  if(error){
    console.log(error);
  }
});

// ==========
// DATABASE
// ==========

var database = {
  // initially display all items available for sale, include names prices ids 
  listItems: function(func) {
    connection.query('SELECT * FROM products WHERE stock_quantity > ?', 0, function(error, result){
      if(error) {
        console.log(error);
      } else {
        itemArray = result;
        console.log(color.bgCyan('\nBamazon Storefront\n'));
        console.log(('id\titem\t\tprice'));
        for(var i = 0; i < itemArray.length; i++) {
          var newProduct = new Product(itemArray[i]);
          storefront.stockArray.push(newProduct);
          newProduct.displayItem();
        }
        func();
      }
    })
  }, 

  checkStock: function(itemId, requestedQuantity) {
    connection.query('SELECT stock_quantity FROM products WHERE item_id = ?', itemId, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        if (result[0].stock_quantity >= requestedQuantity) {
          console.log('we can do that!');
        } else {
          console.log(color.bgRed('\nTransaction cannot be completed: Insufficient quantity available!\n'));
          storefront.hasAnotherOrder();
        }
      }
    })
  }

};

// =================
// USER INTERACTION
// =================
var storefront = {
  'stockArray': [],

  getOrder: function() {
    inquirer.prompt([
      {
        type: 'input',
        message: 'Please enter the id of the product you would like to purchase:',
        name: 'productId'
      },
      {
        type: 'input',
        message: 'Quantity to purchase:',
        name: 'purchaseQuantity'
      }
      ]).then(function(userData){
        database.checkStock(userData.productId, userData.purchaseQuantity);
      })
  }, 

  hasAnotherOrder: function() {
    inquirer.prompt({
      type: 'confirm', 
      message: 'Would you like to revisit the catalog and place a new order?',
      name: 'continue'
    }).then(function(userData) {
      if(userData.continue === true) {
        database.listItems(storefront.getOrder);
      } else {
        console.log(color.bgCyan('\nCome back soon!\n'));
      }
    })
  }

};


// ==========
// INITIALIZE
// ==========

database.listItems(storefront.getOrder);



// prompt user with 2 messages 
// 1. id of product to buy
// 2. how many units to buy 

// get user selection/order
// check if there's enough stock of the product to meet request 

// if not: log insufficient quantity to the user and prevent the order from going through 

// if so: fulfill the customer's order" 
  // update the sql database to reflect the remaining quantity
  // then show the customer the total cost of their purchase 