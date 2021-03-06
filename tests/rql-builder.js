// Generated by CoffeeScript 1.3.3
(function() {

  this.run_tests_rql_builder = function(_) {
    var q, rql;
    rql = function(q) {
      return _.rql(q);
    };
    q = function(a, b) {
      return equal(a.toString(), b.replace(/\+/g, '%2B'), b);
    };
    QUnit.module('RQL builder');
    test('empty', function() {
      equal(rql().toString(), '', 'empty');
      return equal(rql('').toString(), '', 'empty string');
    });
    test('select', function() {
      q(rql().select('a'), 'select(a)');
      q(rql().select('a', 'b'), 'select(a,b)');
      q(rql().select('a', 'b', 'c'), 'select(a,b,c)');
      return q(rql().select(['a', 'b', 'c']), 'select(a,b,c)');
    });
    test('values', function() {
      q(rql().values('a'), 'values(a)');
      q(rql().values('a', 'b'), 'values(a,b)');
      return q(rql().values(['a', 'b']), 'values(a,b)');
    });
    test('distinct', function() {
      return q(rql().distinct(), 'distinct()');
    });
    test('limit', function() {
      q(rql().limit(10), 'limit(10)');
      return q(rql().limit(20, 10), 'limit(20,10)');
    });
    test('sort', function() {
      q(rql().sort('-a'), 'sort(-a)');
      q(rql().sort('-a', '+b'), 'sort(-a,+b)');
      q(rql().sort('-a', '+b', '-c'), 'sort(-a,+b,-c)');
      return q(rql().sort(['-a', '+b', '-c']), 'sort(-a,+b,-c)');
    });
    return test('operators', function() {
      var a, b, expected, o, ops, _i, _len;
      ops = ["eq", "ne", "lt", "le", "gt", "ge", "in", "out", "contains", "excludes", "and", "or"];
      b = rql();
      expected = [];
      for (_i = 0, _len = ops.length; _i < _len; _i++) {
        o = ops[_i];
        q(rql()[o]('a', 1), "" + o + "(a,1)");
        q(rql()[o]('a', 'b'), "" + o + "(a,b)");
        a = rql();
        a[o]('a', 1);
        a[o]('a', 'b');
        q(a, "" + o + "(a,1)&" + o + "(a,b)");
        b[o]('a', 1);
        expected.push("" + o + "(a,1)");
      }
      return equal(b.toString(), expected.join('&'), 'multiple clauses');
    });
  };

  if (typeof require !== 'undefined') {
    this.run_tests_rql_builder(require('underscore-data'));
  }

}).call(this);
