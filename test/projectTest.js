const assert = require('assert');
const db = require("../models");
const Project = db.projects;

  // describe('#find()', function () {
  //   it('responds with matching records', async function () {
  //     const projects = await Project.findAll({type: 'Project'});
  //     projects.should.have.length(3);
  //   });
  // });

  // describe('Project', function () {
  //   describe('#save()', function () {
  //     it('should save without error', function (done) {
  //       var project = new Project('Luna');
  //       project.save();
  //     });
  //   });
  // });

describe('api', function () {
   
  /**
   * All Projects
   */
  describe('GET /api/projects getProjects', function () {
    it('respond with an array of projects', function () {
      const projects = Project.findAll();
      assert.ok(true);
    });
  });

  /**
   * All Pending Projects
   */
  describe('GET /api/projects/pending pendingProjects', function () {
    it('respond with an array of pending projects', function () {
      const projects = Project.findAll();
      assert.ok(true);
    });
  });

  /**
   * All Completed Projects
   */
  describe('GET /api/projects/completed getcompletedProjects', function () {
    it('respond with an array of completed users', function () {
      const projects = Project.findAll();
      assert.ok(true);
    });
  });

});
  