var User = require('../models/user');
var Task = require('../models/task');

// Wrap all the methods in an object

var user = {

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
              User.find(where).skip(skipBy).count().exec(function(err,data){
                  if (err){
                      res.status(500).json({"message":err.message,"data":{} });
                      return;
                  }
                  res.status(200).json({"message":"OK","data":data });
              });
          }
          else{
              User.find(where).skip(skipBy).limit(limitBy).count().exec(function(err,data){
                  if (err){
                      res.status(500).json({"message":err.message,"data":{} });
                      return;
                  }
                  res.status(200).json({"message":"OK","data":data });
              });
          }

      }
      else{
          User.find(where).select(selectBy).sort(sortBy).skip(skipBy).limit(limitBy).exec(function(err,data){
              if (err){
                  res.status(500).json({"message":err.message,"data":{} });
                  return;
              }
              res.status(200).json({"message":"OK","data":data });
          });
      }

  },


  create: function(req, res){

    var user = new User();
    user.name=req.body.name;
    user.email=req.body.email;
    user.pendingTasks=[];
    user.dateCreated=new Date();

    User.find( { email: user.email } ).exec(function(err,data){
        if (err){
            res.status(500).json({"message":err.message,"data":{} });
            return;
        }
        if(data.length !== 0){
            res.status(500).json({"message":"User has already created with this email","data":{} });
        }
        else{
            user.save(function(err,data){
                if (err){
                    res.status(500).json({"message":err.message,"data":{} });
                    return;
                }
                res.status(201).json({"message":"OK","data":data });
            });
        }

    });


  } ,



  options: function(req, res){
      res.writeHead(200);
      res.end();
  },


  getOne: function(req, res){
      User.findById(req.params.id,function(err,data){
          if(req.params.id === "unassigned"){
              res.status(404).json({"message":"User not found","data":{} });
              return;
          }
          if (err){
              res.status(500).json({"message":err.message,"data":{} });
              return;
          }
          if(data === null){
              res.status(404).json({"message":"User not found","data":{} });
              return;
          }
          res.status(200).json({"message":"OK","data":data });
      });
  },

  replace: function(req, res){
      if(typeof(req.body.pendingTasks) === "string" ){
          req.body.pendingTasks = [req.body.pendingTasks];
      }
      User.findByIdAndUpdate(req.params.id, {
              $set: {
                  name          : req.body.name,
                  email         : req.body.email,
                  pendingTasks  : req.body.pendingTasks,
                  dateCreated   : new Date()
              }
          },
          function(err,data){
              if (err){
                  res.status(500).json({"message":err.message,"data":{} });
                  return;
              }
              if(data === null){
                      res.status(404).json({"message":"User not found","data":{} });
                      return;
                  }
              res.status(200).json({"message":"OK","data":data });
          }
      );
  },

  deleteOne: function(req, res){
      User.findByIdAndRemove(req.params.id,function(err,data){
          if (err){
              res.status(500).json({"message":err.message,"data":{} });
              return;
          }
          if(data === null){
              res.status(404).json({"message":"User not found","data":{} });
              return;
          }
          res.status(200).json({"message":"OK","data":data });
      });
  }

};

// Return the object
module.exports = user;
