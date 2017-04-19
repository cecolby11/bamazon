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
  'stockArray': [], 

  // List a set of menu options:
  selectAction: function() {
    inquirer.prompt({
      type: 'list',
      message: 'What would you like to do?',
      name: 'selectedAction',
      choices: ['View Products For Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }).then(function(userData){
      switch(userData.selectedAction) {
        case 'View Products For Sale': 
          database.listAllProducts();
          break;
        case 'View Low Inventory': 
          database.listLowInventory();
          break;
        case 'Add to Inventory':
          workplace.addWhichInventory();
          break;
        case 'Add New Product':
          workplace.addWhichProduct();
          break;
        default:
          database.listAllProducts();
      }
    })
  }, 
  
  // If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
  addWhichInventory: function() {
    inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the item id',
      name: 'itemId'
    },
    {
      type: 'input',
      message: 'Enter quantity to add',
      name: 'addQuantity'
    }]).then(function(userData){
      database.addStockToInventory(userData.itemId, userData.addQuantity);
    })
  },

  // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
  addWhichProduct: function() {
    inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the item name',
      name: 'product_name'
    },
    {
      type: 'input',
      message: 'Enter the department',
      name: 'department_name'
    },
    {
      type: 'input',
      message: 'Enter the unit price',
      name: 'price'
    },
    {
      type: 'input',
      message: 'Enter the stock quantity to add', 
      name: 'stock_quantity'
    }
    ]).then(function(userData){
      database.addItemToInventory(userData);
    })
  }
};

// =========
// DATABASE
// =========

var database = {
  // list every available item: the item IDs, names, prices, and quantities.
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

  // list all items with a inventory count lower than five.
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

  // increase inventory of any item currently in the store.
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

  //add a completely new product to the store.
  addItemToInventory: function(product) {
    connection.query(
      `INSERT INTO products (
        product_name, 
        department_name,
        price,
        stock_quantity
      ) VALUES
      (?, ?, ?, ?);
      `, [product.product_name, product.department_name, product.price, product.stock_quantity], function(error, result) {
        if(error) {
          console.log(error);
        } else {
          // get id it was inserted to and add it to the object 
          var insertId = result.insertId;
          product.item_id = insertId;
          console.log(color.bgGreen('\nProduct add successful!\n'));
          console.log(('id\titem\t\tprice\tquantity'));
          var newProduct = new Product(product);
            newProduct.displayItemToManager();
        }
      });
  }
};

// ==========
// INITIALIZE
// ==========

workplace.selectAction();