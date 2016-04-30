var mongoose = require('mongoose');

var schema = mongoose.Schema({
	netId                  :  String,
	name                   :  String,
    password               :  String,
    followOrganizationID   :  [String]
});

var Student = mongoose.model("Student",schema);

module.exports = Student;
