var Task = require('../models/task');
var User = require('../models/user');
// Wrap all the methods in an object

var task = {

//    options


  getAll: function(req, res){
      var where=eval("("+req.query.where+")");
      var selectBy=eval("("+req.query.select+")");
      var sortBy=eval("("+req.query.sort+")");
      var skipBy=parseInt(req.query.skip);
      var limitBy=parseInt(req.query.limit);
      if(req.query.count==="True" || req.query.count==="true"){
          if(req.query.skip=== undefined){
              skipBy=0;
          }

          if(req.query.limit=== undefined){
              Task.find(where).skip(skipBy).count().exec(function(err,data){
                  if (err){
                      res.status(500).json({"message":err.message,"data":{} });
                      return;
                  }
                  res.status(200).json({"message":"OK","data":data });
              });
          }
          else{
              Task.find(where).skip(skipBy).limit(limitBy).count().exec(function(err,data){
                  if (err){
                      res.status(500).json({"message":err.message,"data":{} });
                      return;
                  }
                  res.status(200).json({"message":"OK","data":data });
              });
          }

      }
      else{
          Task.find(where).select(selectBy).sort(sortBy).skip(skipBy).limit(limitBy).exec(function(err,data){
              if (err){
                  res.status(500).json({"message":err.message,"data":{} });
                  return;
              }
              res.status(200).json({"message":"OK","data":data });
          });
      }




  },

  create: function(req, res){

    var task = new Task();
    task.name=req.body.name;
    task.description=req.body.description;
    task.deadline=req.body.deadline;
    task.completed=req.body.completed;
    task.assignedUser=req.body.assignedUser;
    task.assignedUserName=req.body.assignedUserName;
    task.dateCreated=new Date();

    task.save(function(err,data){
        if (err){
            res.status(500).json({"message":err.message,"data":{} });
            return;
        }
        res.status(200).json({"message":"OK","data":data });
    });
  } ,



  options: function(req, res){
      res.writeHead(200);
      res.end();
  },


  getOne: function(req, res){
      Task.findById(req.params.id,function(err,data){
          if (err){
              res.status(500).json({"message":err.message,"data":{} });
              return;
          }
          if(data === null){
              res.status(404).json({"message":"Task not found","data":{} });
              return;
          }

          res.status(200).json({"message":"OK","data":data });
      });
  },

  replace: function(req, res){
      Task.findByIdAndUpdate(req.params.id, {
              $set: {
                  name             : req.body.name,
                  description      : req.body.description,
                  deadline         : req.body.deadline,
                  completed        : req.body.completed,
                  assignedUser     : req.body.assignedUser,
                  assignedUserName : req.body.assignedUserName,
                  dateCreated      : new Date()
              }
          },
          function(err,data){
              if (err){
                  res.status(500).json({"message":err.message,"data":{} });
                  return;
              }
              if(data === null){
                      res.status(404).json({"message":"Task not found","data":{} });
                      return;
              }
              res.status(200).json({"message":"OK","data":data });
          }
      );
  },

  deleteOne: function(req, res){
      Task.findByIdAndRemove(req.params.id,function(err,data){
          if (err){
              res.status(500).json({"message":err.message,"data":{} });
              return;
          }
          if(data === null){
                  res.status(404).json({"message":"Task not found","data":{} });
                  return;
          }
          res.status(200).json({"message":"OK","data":data });
      });
  }
};

// Return the object
module.exports = task;
