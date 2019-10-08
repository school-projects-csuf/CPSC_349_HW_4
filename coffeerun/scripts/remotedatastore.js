(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
  var CheckList = App.CheckList;
  var checkList = new CheckList(CHECKLIST_SELECTOR);


  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      /* eslint-disable-next-line no-console */
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function() {
    $.get(this.serverUrl, function(serverResponse) {
      /* eslint-disable-next-line no-console */
      console.log(serverResponse);
      serverResponse.forEach(function(response) {
        checkList.addRow.call(checkList, response);
      });
    });
  };




  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + "/" + key, function(serverResponse) {
      /* eslint-disable-next-line no-console */
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    $.ajax(this.serverUrl + "/" + key, {
      type: "DELETE"
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);
