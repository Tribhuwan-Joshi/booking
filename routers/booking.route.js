const Router = require('express').Router();
const { body, param, validationResult } = require('express-validator');
const bookingController = require('../controllers/booking.js');

Router.get('/', bookingController.getAllBookings);

Router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid booking ID')],
  bookingController.getBookingById
);

Router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 100 })
      .withMessage('Name cannot exceed 100 characters'),

    body('date')
      .notEmpty()
      .withMessage('Date is required')
      .isISO8601()
      .withMessage('Invalid date format')
      .custom((value) => {
        const bookingDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (bookingDate < today) {
          throw new Error('Booking date must be in the future');
        }
        return true;
      }),

    body('time')
      .notEmpty()
      .withMessage('Time is required')
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage('Time must be in HH:MM format'),

    body('guests')
      .notEmpty()
      .withMessage('Number of guests is required')
      .isInt({ min: 1, max: 20 })
      .withMessage('Guests must be between 1 and 20'),
  ],
  bookingController.createBooking
);

Router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid booking ID'),

    body('name')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Name cannot be empty')
      .isLength({ max: 100 })
      .withMessage('Name cannot exceed 100 characters'),

    body('date')
      .optional()
      .isISO8601()
      .withMessage('Invalid date format')
      .custom((value) => {
        const bookingDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (bookingDate < today) {
          throw new Error('Booking date must be in the future');
        }
        return true;
      }),

    body('time')
      .optional()
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage('Time must be in HH:MM format'),

    body('guests')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Guests must be between 1 and 20'),
  ],
  bookingController.updateBooking
);

Router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid booking ID')],
  bookingController.deleteBooking
);

module.exports = Router;
