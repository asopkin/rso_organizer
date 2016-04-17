var mongoose = require('mongoose');

var schema = {
	netId                  :  String,
	name                   :  String,
    password               :  String,
    followOrganizationID   :  [String]
};


var Student = mongoose.model("Student",schema);

module.exports = Student;
