// // src/app.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path');

// const carbonCreditsRouter = require('./api/routes/carbonCredits');
// const verificationRouter = require('./api/routes/verification');

// const app = express();
// const port = process.env.PORT || 3000;



// app.use(express.static(path.join(__dirname, '../../frontend/build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });



// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 
// };

// app.use(cors(corsOptions));


// app.use(express.json());

// app.use('/api/carbon-credits', carbonCreditsRouter);
// app.use('/api/verification', verificationRouter);


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
// });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });








require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');


const carbonCreditsRouter = require('./api/routes/carbonCredits');
const verificationRouter = require('./api/routes/verification');

const app = express();
const port = process.env.PORT || 3000;



const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.PRODUCTION_CLIENT_URL 
    : ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200,
  credentials: true
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/carbon-credits', carbonCreditsRouter);
app.use('/api/verification', verificationRouter);


if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, '../../frontend/build')));
} else {

  app.use(express.static(path.join(__dirname, '../public')));
}


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});


app.get('/api/docs', (req, res) => {
  res.json({
    endpoints: {
      'GET /api/health': 'Health check endpoint',
      'GET /api/docs': 'This documentation',
      '/api/carbon-credits': 'Carbon credits related endpoints',
      '/api/verification': 'Verification related endpoints'
    }
  });
});


app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message
  });
});


app.listen(port, () => {
  console.log(`
Server Started Successfully
-------------------------
🚀 Server is running on port: ${port}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📁 Static files: ${process.env.NODE_ENV === 'production' ? 'frontend/build' : 'public'}
🔒 CORS enabled for: ${corsOptions.origin}
  `);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;