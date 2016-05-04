var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema({
	netId                  :  String,
	name                   :  String,
    password               :  String,
    followOrganizationID   :  [String]
});


console.log("student stuff");
schema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

var Student = mongoose.model("Student",schema);
module.exports = Student;
