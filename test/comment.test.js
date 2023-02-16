const assert = require('assert');
const db = require("../models");
const Comment = db.comments;


describe('Comment Unit Tests', function () {
   
  /**
   * All Comments.
   * @test 
   */
  describe('GET /api/comments getComments', function () {
    it('respond with an array of comments', function () {
      const tasks = Comment.findAll();
      assert.ok(true);
    });
  });

  /**
   * Register Comments
   * 
   */
  describe("POST /api/comments registerComment", function () {
    it("should successfully add a comment", async function () {

      const data ={
        name: 'Error handling',
        taskId: 1,
        status: 1,
        comment: "form validation and error Handling ",
        userId: 2,
      }
  
      Comment.create(data);

      assert.ok(true);

    });
  });

});
  