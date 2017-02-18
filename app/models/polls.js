'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollOption = new Schema({
		option: String, 
	    count: Number, 
}, {_id: false});

var Poll = new Schema({
	
	created_by: Number,
	created_timestamp: Date,
	active: Boolean,
	poll_stimulus: String,
	poll_options: [pollOption]
	
});

module.exports = mongoose.model('Poll', Poll);
