module.exports = (app) => {
    const events = require('../controllers/event.controller.js');


// Create a new event
app.post('/api/create', events.create);

// Retrieve all events
app.get('/api/events', events.findAll);

// Retrieve a single event with eventId
app.get('/api/events/:eventId', events.findOne);

// Update a event with eventId
app.put('/api/events/:eventId', events.update);

// Delete a event with eventId
app.delete('/api/events/:eventId', events.delete);

}