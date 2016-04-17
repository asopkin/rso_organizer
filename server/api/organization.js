var Organization = require('../models/organization');
// Wrap all the methods in an object

var organization = {

  getAll: function(req, res){
      Organization.find().exec(function(err,data){
          res.json(data);
      });
  },

  create: function(req, res){

    var organization = new Organization();
    organization.name=req.body.name;
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
                  name      :   req.body.name,
                  leaders   :   req.body.leaders,
                  members   :   req.body.members,
                  events    :   req.body.events
              }
          },
          function(err,data){
              res.json(data);
          }
      );
  }


};

// Return the object
module.exports = organization;
