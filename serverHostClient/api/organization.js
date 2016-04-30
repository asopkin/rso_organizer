var Organization = require('../models/organization');

// helper
var remove_organization_from_student = function(followingorgIDs, orgID) {
    var found = followingorgIDs.indexOf(orgID);

    while (found !== -1) {
        followingorgIDs.splice(found, 1);
        found = followingorgIDs.indexOf(orgID);
    }
};


// Wrap all the methods in an object

var organization = {

  getAll: function(req, res){
      var where=eval("("+req.query.where+")");
      Organization.find(where).exec(function(err,data){
          res.json(data);
      });
  },

  getOneCategory:function(req, res){
      Organization.find().exec(function(err,data){
          var back=[];
          var kind = req.params.category;
          for(var index=0;index<data.length;index++){
              var one =data[index];
              if((one.category.indexOf(kind) != -1)){
                  back.push(one);
              }
          }
          res.json(back);
      });
  },

  create: function(req, res){

    var organization = new Organization();
    organization.name=req.body.name;
    organization.description=req.body.description;
    organization.category=req.body.category;
    organization.leaders=req.body.leaders;
    organization.members=req.body.members;
    organization.events=req.body.events;

    organization.save(function(err,data){
        res.json(data);
    });
  } ,



  getOne: function(req, res){
      Organization.findById(req.params.id,function(err,data){
          res.json(data);
      });
  },

  replace: function(req, res){
      Organization.findByIdAndUpdate(req.params.id, {
              $set: {
                  name        :   req.body.name,
                  description :   req.body.description,
                  category    :   req.body.category,
                  leaders     :   req.body.leaders,
                  members     :   req.body.members,
                  events      :   req.body.events
              }
          },
          function(err,data){
              res.json(data);
          }
      );
  },
  
  deleteOne: function(req, res){   
 
      Organization.findByIdAndRemove(req.params.id,function(err,data){
          // remove event[] from Event
          for( var i=0 ; i<data.events.length ; i++){
            Event.findByIdAndRemove(data.events[i],function(err){ });
          }
          // remove org from student.followingOrg                          
          for( var i=0 ; i<data.members[i].length ; i++){
            Student.findById(data.members[i],function(err,student_obj){
             remove_organization_from_student(student_obj.followOrganizationID,req.params.id);
             student_obj.save().exec();              
            });
          }                          
          res.json(data);
       });
  }


};

// Return the object
module.exports = organization;
