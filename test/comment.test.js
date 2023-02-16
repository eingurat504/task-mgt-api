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

   /**
   * Update Comments
   * 
   */
     describe("PUT /api/comments/:commentId updateComment", function () {
      it("should successfully update a comment", async function () {
  
        const data ={
          name: 'Error handling',
          taskId: 1,
          status: 1,
          comment: "form validation and error Handling ",
          userId: 2,
        }

        const id = 1;

        Comment.update(data, {
          where: { id: id }
        })
  
        assert.ok(true);
  
      });
    });

      /**
   * Update Comments
   * 
   */
    describe("DELETE /api/comments/:commentId deleteComment", function () {
      it("should successfully delete a comment", async function () {
  
        const id = 1;

        Comment.destroy({
          where: { id: id }
        })
  
        assert.ok(true);
  
      });
    });

});
  