'use strict';

var test = require('tape');
var validator = require('./validator.js')

test("validator accepts valid email, a scale of 15 and positive feedback", function (t){
  t.equal(validator.validation('super', '15', 'sdfsdf@fff.com'), true);
  t.end();
});


test("validator rejects unfilled email, a scale of 15 and positive feedback", function (t){
  t.equal(validator.validation('super', '15', 'sdfsdffff.com'), false);
  t.end();
});

test("validator rejects valid email, a scale of 9 and positive feedback", function (t){
  t.equal(validator.validation('super', '9', 'sdfsdf@fff.com'), false);
  t.end();
});
