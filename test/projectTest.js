const assert = require('assert');
const db = require("../models");
const User = db.users;

// beforeEach(async function () {
//     await db.clear();
//     await db.save([tobi, loki, jane]);
//   });
  
  describe('#find()', function () {
    it('responds with matching records', async function () {
      const users = await db.findAll({type: 'User'});
      users.should.have.length(3);
    });
  });

  describe('User', function () {
    describe('#save()', function () {
      it('should save without error', function (done) {
        var user = new User('Luna');
        user.save();
      });
    });
  });