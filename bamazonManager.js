// =============
// DEPENDENCIES
// =============

var inquirer = require('inquirer');
var color = require('cli-color');
var Product = require('./product.js').Product;
var connection = require('./databaseConnection.js').connection;

// =================
// USER INTERACTION
// =================

var workplace = {
  'stockArray': []
}

// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product

  // If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

    // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.


// =========
// DATABASE
// =========

var database = {
  // If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
  listAllProducts: function() {
    connection.query('SELECT * FROM products', function(error, result) {
      if(error) {
        console.log(error);
      } else {
        console.log(color.bgYellow('\nBamazon Workplace - All Products \n'));
        console.log(('id\titem\t\tprice\tquantity'));
        for(var i = 0; i < result.length; i++) {
          var newProduct = new Product(result[i]);
          workplace.stockArray.push(newProduct);
          newProduct.displayItemToManager();
        }
      }
    });
  },

  // If a manager selects View Low Inventory, then it should list all items with a inventory count lower than five.
  listLowInventory: function() {
    connection.query('SELECT * FROM products WHERE stock_quantity < ?', 5, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        console.log(color.bgRed('\nBamazon Workplace - Low Inventory\n'));
        console.log(('id\titem\t\tprice\tquantity'));
        for(var i = 0; i < result.length; i++) {
          var newProduct = new Product(result[i]);
          workplace.stockArray.push(newProduct);
          newProduct.displayItemToManager();
        }
      }
    })
  },

  // If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
  addStockToInventory: function(itemId, addQuantity) {
    connection.query('UPDATE products SET stock_quantity = (stock_quantity + ?) WHERE item_id = ?', [addQuantity, itemId], function(error, result) {
      if(error){
        console.log(error);
      } else {
        connection.query('SELECT * FROM products WHERE item_id = ?', itemId, function(error, result) {
          if (error) {
            console.log(error);
          } else {
            console.log(color.bgGreen('\nInventory add successful!\n'));
            console.log(('id\titem\t\tprice\tquantity'));
            var updatedProduct = new Product(result[0]);
            updatedProduct.displayItemToManager();
          }
        })
      }
    })
  },

  // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
  addItemToInventory: function(product) {
    
  }

};

// ==========
// INITIALIZE
// ==========

database.addStockToInventory(3, 3);