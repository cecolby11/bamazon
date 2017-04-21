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
          office.addWhichDepartment();
          break;
        default:
          database.salesByDepartment();
      }
    })
  }, 

  addWhichDepartment: function() {
    inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the department name',
      name: 'department_name'
    },
    {
      type: 'input',
      message: 'Enter the department overhead costs',
      name: 'overhead_costs'
    }
    ]).then(function(userData){
      database.createNewDepartment(userData);
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

  createNewDepartment: function(department) {
    connection.query(
      `INSERT INTO departments (
        department_name, 
        overhead_costs
      ) VALUES
        (?,?);
      `, [department.department_name, department.overhead_costs], function(error, result){
        if(error) {
          console.log(error);
        } else {
          // get id it was inserted to and add it to the object
          var insertId = result.insertId;
          department.department_id = insertId;
          console.log(color.bgGreen('\nDepartment add: successful!\n'));
          console.table([department]);
        }
      });
  }
}

var displayTable = {
  departmentSales: function(deptsArr) {
    console.table(deptsArr);
  }
}

office.selectAction();
