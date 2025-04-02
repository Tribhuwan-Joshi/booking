const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan'); // for logging
const mongoose = require('mongoose');
const utils = require('./utils');

const bookingRouter = require('./routers/booking.route');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

(async () => {
  console.log('DB connecting...');
  mongoose
    .connect(utils.DB_URI)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('Error during db connection ', err));
})();

app.get('/', (req, res) => {
  res.send('This is the home route for restaurant booking');
});
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});
app.use('/api/bookings', bookingRouter);

app.use(utils.errorHandler);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
  });
});

app.listen(utils.PORT, () => console.log('Server listening at port 3000'));
