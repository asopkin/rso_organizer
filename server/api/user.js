var User = require('../models/user');

//helper function
var remove_user_from_organizations = function(array, userID) {
    var found = array.indexOf(userID);

    while (found !== -1) {
        array.splice(found, 1);
        found = array.indexOf(userID);
    }
};



// Wrap all the methods in an object

var user = {

  getAll: function(req, res){
      User.find().exec(function(err,data){
          res.json(data);
      });
  },

  create: function(req, res){

    var user = new User();
    user.netId=req.body.netId;
    user.name=req.body.name;
    user.password=req.body.password;
    user.followOrganizationID=req.body.followOrganizationID;

    user.save(function(err,data){
        res.json(data);
    });
  } ,



  getOne: function(req, res){
      User.findById(req.params.id,function(err,data){
          res.json(data);
      });
  },

  replace: function(req, res){
      User.findByIdAndUpdate(req.params.id, {
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
  },
  
  deleteOne: function(req, res){   
 
      User.findByIdAndRemove(req.params.id,function(err,data){
          // remove student from Organization
          Organization.findById(data.followOrganizationID ,function(err, organization){ 
             remove_student_from_organizations(organization.members,req.params.id);
             remove_student_from_organizations(organization.leaders,req.params.id);
             organization.save().exec();  
          });                                         
          res.json(data);
       });
  }


};

// Return the object
module.exports = student;
