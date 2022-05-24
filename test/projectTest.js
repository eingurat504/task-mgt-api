const assert = require('assert');
const db = require("../models");
const Project = db.projects;

// beforeEach(async function () {
//     await db.clear();
//     await db.save([tobi, loki, jane]);
//   });
  
  describe('#find()', function () {
    it('responds with matching records', async function () {
      const projects = await Project.findAll({type: 'Project'});
      projects.should.have.length(3);
    });
  });

  describe('Project', function () {
    describe('#save()', function () {
      it('should save without error', function (done) {
        var project = new Project('Luna');
        project.save();
      });
    });
  });