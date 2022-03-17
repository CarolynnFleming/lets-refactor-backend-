const pool = require('../utils/pool');
module.exports = class Order {
    id;
    product;
    quantity;
}

constructor(row) {
    this.id = row.id;
    this.product = row.product;
    this.quantity = row.quantity;
}