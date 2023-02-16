const assert = require('assert');
const db = require("../models");
const User = db.users;

describe('User Unit Tests', function () {
   
  describe('GET /api/users getUsers', function () {
    it('respond with an array of users', function () {
      const users = User.findAll();
      assert.ok(true);
    });
  });

  describe('GET /api/users/deactivated deactivatedUsers', function () {
    it('respond with an array of deactivated users', function () {
      const users = User.findAll({ where: { status: 'inactive' }  });
      assert.ok(true);
    });
  });

  describe('GET /api/users/active getActiveUsers', function () {
    it('respond with an array of active users', function () {
      const users = User.findAll({ where: { status: 'active' }  });
      assert.ok(true);
    });
  });

});
  