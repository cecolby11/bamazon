// =============
// DEPENDENCIES
// =============
var color = require('cli-color');

// ===========
// CONSTRUCTOR
// ===========
var Product = function(productObj) {
  this.id = productObj.item_id;
  this.name = productObj.product_name;
  this.dept = productObj.department_name;
  this.price = productObj.price;
  this.quantity = productObj.stock_quantity
};

Product.prototype.displayItem = function() {
  console.log('\n' + 
            color.green(this.id +
            '\t' + 
            color.cyan(this.name)) + 
            '\t' + 
            color.magenta(this.price));
}

module.exports = {
  Product: Product
}