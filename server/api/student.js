var Student = require('../models/student');
// Wrap all the methods in an object

var student = {

  getAll: function(req, res){
      Student.find().exec(function(err,data){
          res.json(data);
      });
  },

  create: function(req, res){

    var student = new Student();
    student.netId=req.body.netId;
    student.name=req.body.name;
    student.password=req.body.password;
    student.followOrganizationID=req.body.followOrganizationID;

    student.save(function(err,data){
        res.json(data);
    });
  } ,



  getOne: function(req, res){
      Student.findById(req.params.id,function(err,data){
          res.json(data);
      });
  },

  replace: function(req, res){
      Student.findByIdAndUpdate(req.params.id, {
              $set: {
                  netId                 :   req.body.netId,
                  name                  :   req.body.name,
                  password              :   req.body.password,
                  followOrganizationID  :   req.body.followOrganizationID
              }
          },
          function(err,data){
              res.json(data);
          }
      );
  }


};

// Return the object
module.exports = student;
