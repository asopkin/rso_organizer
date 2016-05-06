var Event = require('../models/event');


//helper function
var remove_event_from_events = function(events, eventID) {
    var found = events.indexOf(eventID);

    while (found !== -1) {
        events.splice(found, 1);
        found = events.indexOf(events);
    }
};


// Wrap all the methods in an object

var event = {

  getAll: function(req, res){
      var where=eval("("+req.query.where+")");
      Event.find(where).sort({"date": 1}).exec(function(err,data){
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
//                  name             : req.body.name,
//                  description      : req.body.description,
                  date             : req.body.date
//                  organizationID   : req.body.organizationID,
//                  organizationName : req.body.organizationName
              }
          },
          function(err,data){
              res.json(data);
          }
      );
  },

  deleteOne: function(req, res){   
 
      Event.findByIdAndRemove(req.params.id,function(err,data){
          // remove event from Organization
          Organization.findById(data.organizationID,function(err, organization){ 
             remove_event_from_events(organization.events,req.params.id);
             organization.save().exec();  
          });                                         
          res.json(data);
       });
  }
};

// Return the object
module.exports = event;
