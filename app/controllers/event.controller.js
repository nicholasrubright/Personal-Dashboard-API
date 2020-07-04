const Event = require('../models/event.model.js');

// Create and Save a new event
exports.create = (req, res) => {

    // Validate request
    if(!req.body.eventName) {
        return res.status(400).send({
            message: "Event content can not be empty"
        });
    }

    // Create event
    const event = new Event({
        eventName: req.body.eventName || "Untitled Event",
        startDate: req.body.startDate || "Undefined StartDate",
        endDate: req.body.endDate || "Undefined End Date",
        startTime: req.body.startTime || "Undefined Start Time",
        endTime: req.body.endTime || "Undefined End Time",
        type: req.body.type || "Undefined Type",
        description: req.body.description
    });

    // Save Event in the database
    event.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the event"
        });
    });

};

// Retrieve and return all events from the database
exports.findAll = (req, res) => {
    Event.find()
    .then(events => {
        res.send(events);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving events"
        });
    });
};

// Find a single event with eventId
exports.findOne = (req, res) => {
    Event.findById(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        return res.status(500).send({
            message: "Error retrieving event with id " + req.params.eventId
        });
    });
};

// Update a event identified by the eventId in the request
exports.update = (req, res) => {

    //Validate request
    if(!req.body.eventName) {
        return res.status(400).send({
            message: "Event content can not be empty"
        });
    }

    // Find Event and update it with the request body
    Event.findByIdAndUpdate(req.params.eventId, {
        eventName: req.body.eventName || "Untitled",
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        type: req.body.type,
        description: req.body.description
    }, {new: true})
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id" + req.params.eventId
            });
        }
        return res.status(500).send({
            message: "Error updating event with id " + req.params.eventId
        });
    });
};

// Deleete a event with the specified eventId in the request
exports.delete = (req, res) => {
    Event.findByIdAndRemove(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send({message: "Event deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        return res.status(500).send({
            message: "Could not delete event with id " + req.params.eventId
        });
    });
};