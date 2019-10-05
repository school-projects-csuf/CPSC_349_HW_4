(function(window) {
  "use strict";
  //code here
  var App = window.App || {};

  function Truck(truckId, db) {
  /* eslint-disable-next-line no-console */
    console.log("in Truck.js");
    this.truckId = truckId;
    this.db = db;
  }


  Truck.prototype.createOrder = function(order) {
    /* eslint-disable-next-line no-console */
    console.log("Adding order for " + order.emailAddress);
    this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function(customerId) {
    /* eslint-disable-next-line no-console */
    console.log("Delivering order for " + customerId);
    this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function() {
    var customerIdArray = Object.keys(this.db.getAll());
    /* eslint-disable-next-line no-console */
    console.log("Truck #" + this.truckId + " has a pending order: ");

    customerIdArray.forEach(function(id) {
      /* eslint-disable-next-line no-console */
      console.log(this.db.get(id));
    }.bind(this));
  };


  App.Truck = Truck;
  window.App = App;
})(window);
