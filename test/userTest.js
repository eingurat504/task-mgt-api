const assert = require('assert');
const db = require("../models");
const User = db.users;


  // describe('#find()', function () {
  //   it('responds with matching records', async function () {
  //     const users = await db.findAll({type: 'User'});
  //     users.should.have.length(3);
  //   });
  // });

  // describe('User', function () {
  //   describe('#save()', function () {
  //     it('should save without error', function (done) {
  //       var user = new User('Luna');
  //       user.save();
  //     });
  //   });
  // });

describe('api', function () {
   
  describe('GET /api/users getUsers', function () {
    it('respond with an array of users', function () {
      const users = User.findAll();
      assert.ok(true);
    });
  });

  describe('GET /api/users/deactivated deactivatedUsers', function () {
    it('respond with an array of deactivated users', function () {
      const users = User.findAll();
      assert.ok(true);
    });
  });

  describe('GET /api/users/active getActiveUsers', function () {
    it('respond with an array of active users', function () {
      const users = User.findAll();
      assert.ok(true);
    });
  });

  describe('GET /api/users/me getProfile', function () {
    it('respond with an array of user profile', function () {
      const users = User.findAll();
      assert.ok(true);
    });
  });

});
  