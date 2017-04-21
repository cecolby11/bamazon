// =============
// DEPENDENCIES
// =============

var inquirer = require('inquirer');
var color = require('cli-color');
require('console.table');
var Product = require('./product.js').Product;
var connection = require('./databaseConnection.js').connection;

// =================
// USER INTERACTION
// =================

var office = {

  // List a set of menu options:
  selectAction: function() {
    inquirer.prompt({
      type: 'list',
      message: 'Managerial functions:',
      name: 'selectedAction',
      choices: ['View Product Sales By Department', 'Create New Department']
    }).then(function(userData){
      switch(userData.selectedAction) {
        case 'View Product Sales By Department': 
          database.salesByDepartment();
          break;
        case 'Create New Department': 
          database.createNewDepartment();
          break;
        default:
          database.salesByDepartment();
      }
    })
  }
};

var database = {
  salesByDepartment: function() {
    // get sales for each department
     // use alias to calculate profits from overhead - total salesinstead of storing 
    connection.query('SELECT *, total_sales - overhead_costs as profit FROM departments', function(error, result) {
      if (error) {
        console.log(error);
      } else {
        var deptsArr = result;
        displayTable.departmentSales(deptsArr);
      }
    });
  }, 

  createNewDepartment: function() {

  }
}

var displayTable = {
  departmentSales: function(deptsArr) {
    console.table(deptsArr);
  }
}

office.selectAction();