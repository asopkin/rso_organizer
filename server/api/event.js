var Event = require('../models/event');
// Wrap all the methods in an object

var event = {

  getAll: function(req, res){
      var where=eval("("+req.query.where+")");
      Event.find(where).exec(function(err,data){
          res.json(data);
      });

  },

  create: function(req, res){

    var event = new Event();
    event.name=req.body.name;
    event.description=req.body.description;
    event.date=req.body.date;
    event.organizationID=req.body.organizationID;
    event.organizationName=req.body.organizationName;


    event.save(function(err,data){
        res.json(data);
    });
  } ,



  getOne: function(req, res){
      Event.findById(req.params.id,function(err,data){
          res.json(data);
      });
  },

  replace: function(req, res){
      Event.findByIdAndUpdate(req.params.id, {
              $set: {
                  name             : req.body.name,
                  description      : req.body.description,
                  date             : req.body.date,
                  organizationID   : req.body.organizationID,
                  organizationName : req.body.organizationName
              }
          },
          function(err,data){
              res.json(data);
          }
      );
  },

  deleteOne: function(req, res){
      Event.findByIdAndRemove(req.params.id,function(err,data){
          res.json(data);
      });
  }
};

// Return the object
module.exports = event;
