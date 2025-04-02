const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1, time: 1 });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: { bookings },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookings',
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: { booking },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch booking',
    });
  }
};

const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }

    const conflictingBooking = await Booking.findOne({
      date: new Date(req.body.date).toISOString().split('T')[0],
      time: req.body.time,
    });

    if (conflictingBooking) {
      return res.status(409).json({
        status: 'error',
        message: 'This time slot is already booked',
      });
    }

    const newBooking = await Booking.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { booking: newBooking },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create booking',
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: { booking },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update booking',
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }

    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete booking',
    });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
