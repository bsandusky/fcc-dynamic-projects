'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler () {
	
	this.getPolls = function(req, res) {
		
		Polls
			.find({ 'created_by': req.user.github.id })
			.exec(function(err, results) {
				if (err) { throw err; }
			
				res.json(results);
			});
	};
	
	this.addPoll = function(req, res) {

		var optionsArray = req.body.poll_options.split(";");
		var formattedOptions = [];

		optionsArray.forEach(function(option) {
			formattedOptions.push({"option": option.trim(), count: 0});
		});
		
		var newPollObject = {};
		
		newPollObject['created_by'] = req.user.github.id;
		newPollObject['created_timestamp'] = Date.now();
		newPollObject['active'] = true;
		newPollObject['poll_stimulus'] = req.body.poll_stimulus;
		newPollObject['poll_options'] = formattedOptions;
		
		var poll = new Polls(newPollObject);
		poll.save(function(err, poll) {
			if (err) { throw err };
			res.json(poll);
		});
	}
	
	this.updatePoll = function (req, res) {
		
		Polls.findById(req.body._id, function (err, poll) {
			if (err) { throw err; }
			
			poll.active = !poll.active;
			poll.save(function (err, updatedPoll) {
				if (err) { throw err; }		
				res.json(updatedPoll);
			});
		});
	}
}

module.exports = ClickHandler;
