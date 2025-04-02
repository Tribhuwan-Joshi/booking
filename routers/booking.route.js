const Router = require('express').Router();
const bookingController = require('../controllers/booking.js');

Router.get('/', async (req, res) => {
  res.json();
});

module.exports = Router;
