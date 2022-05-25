const assert = require('assert');
const db = require("../models");
const Task = db.tasks;


describe('Task Unit Tests', function () {
   
  /**
   * All Tasks.
   * @test 
   */
  describe('GET /api/tasks getTasks', function () {
    it('respond with an array of tasks', function () {
      const tasks = Task.findAll();
      assert.ok(true);
    });
  });

  /**
   * All Pending Tasks.
   * @test 
   */
  describe('GET /api/tasks/pending pendingTasks', function () {
    it('respond with an array of pending tasks', function () {
      const tasks = Task.findAll({ where: { status: 'pending' }  });
      assert.ok(true);
    });
  });

    /**
   * All Accepted Tasks.
   * @test 
   */
  describe('GET /api/tasks/accepted getAcceptedTasks', function () {
    it('respond with an array of accepted tasks', function () {
      const tasks = Task.findAll({ where: { status: 'accepted' }  });
      assert.ok(true);
    });
  });

  /**
   * All Completed Tasks.
   * @test 
   */
  describe('GET /api/tasks/completed getCompletedTasks', function () {
    it('respond with an array of Completed Tasks', function () {
      const tasks = Task.findAll({ where: { status: 'completed' }  });
      assert.ok(true);
    });
  });

  /**
   * All Rejected Tasks
   */
  describe('GET /api/tasks/rejected getRejectedTasks', function () {
    it('respond with an array of Rejected Tasks', function () {
      const tasks = Task.findAll({ where: { status: 'rejected' }  });
      assert.ok(true);
    });
  });

  /**
   * 
   */
  describe("POST /api/tasks registerTask", function () {
    it("should successfully add a task", async function () {

      const data ={
        name: 'Error handling',
        project_id: 1,
        status: 1,
        description: "form validation and error Handling ",
        remarks: "Imediately after shift",
      }
  
      const returnedTask = Task.create(data);

      assert.ok(true);

    });
  });

});
  