const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [100, 'Name cannot be more than 100 characters'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: 'Booking date must be in the future',
    },
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
    validate: {
      validator: function (value) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
      },
      message: 'Time must be in HH:MM format',
    },
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'At least 1 guest is required'],
    max: [20, 'Maximum 20 guests allowed'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
