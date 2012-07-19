// Generated by CoffeeScript 1.3.3
(function() {

  this.run_tests_memory = function() {
    var compareData, dataOrig, module, testData;
    module = QUnit.module;
    dataOrig = [
      {
        id: 1,
        name: 'John'
      }, {
        id: 2,
        name: 'Sarah'
      }
    ];
    compareData = function(data) {
      data.sort(function(a, b) {
        return a.id - b.id;
      });
      return deepEqual(data, dataOrig);
    };
    testData = function(data) {
      var backend, store;
      backend = new MemoryBackend();
      store = backend.objectStore('item', {
        json: data
      });
      return store.query().then(function(qdata) {
        compareData(qdata);
        store.fromJSON({});
        return store.query().then(function(qdata) {
          deepEqual(qdata, []);
          store.fromJSON(data);
          return store.query().then(function(qdata) {
            compareData(qdata);
            return start();
          });
        });
      });
    };
    module("MemoryStore");
    asyncTest('json parameter in constructor: Array', 3, function() {
      var data;
      data = [
        {
          id: 1,
          name: 'John'
        }, {
          id: 2,
          name: 'Sarah'
        }
      ];
      return testData(data);
    });
    asyncTest('json parameter in constructor: Array in JSON', 3, function() {
      var data;
      data = '[{"id":1,"name":"John"},{"id":2,"name":"Sarah"}]';
      return testData(data);
    });
    asyncTest('json parameter in constructor: Object', 3, function() {
      var data;
      data = {
        1: {
          id: 1,
          name: 'John'
        },
        2: {
          id: 2,
          name: 'Sarah'
        }
      };
      return testData(data);
    });
    return asyncTest('json parameter in constructor: Object in JSON', 3, function() {
      var data;
      data = {
        "1": {
          "id": 1,
          "name": "John"
        },
        "2": {
          "id": 2,
          "name": "Sarah"
        }
      };
      return testData(data);
    });
  };

  if (typeof require !== 'undefined') {
    this.run_tests_memory();
  }

}).call(this);