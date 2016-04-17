var mongoose = require('mongoose');

var schema = {
	name             :  String,
	description      :  String,
    date             :  Date,
    organizationID   :  String,
    organizationName :  String
};


var Event = mongoose.model("Event",schema);

module.exports = Event;
