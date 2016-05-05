var mongoose = require('mongoose');

var schema = {
	name        :  String,
    description : String,
    category    :  [String],
	leaders     :  [String],
    members     :  [String],
    emails		:  [String],
    events      :  [String]
};


var Organization = mongoose.model("Organization",schema);

module.exports = Organization;
