var mongoose = require('mongoose');

var schema = {
	name     :  String,
	leaders  :  [String],
    members  :  [String],
    events   :  [String]
};


var Organization = mongoose.model("Organization",schema);

module.exports = Organization;
