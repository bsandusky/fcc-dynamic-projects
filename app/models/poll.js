'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	
	created_by: String,
	created_timestamp: Date,
	active: Boolean,
	poll_stimulus: String,
	poll_options: [{ 
	    option: String, 
	    count: Number
	}]
	
});

module.exports = mongoose.model('Poll', Poll);
