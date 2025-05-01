const express = require('express');
const router = express.Router();

// Dummy dashboard data route
router.get('/', (req, res) => {
  // In real app, authenticate user and fetch user-specific data
  res.json({
    message: 'Welcome to SentinelID dashboard',
    cameras: [
      { id: 'cam1', name: 'Front Door Camera' },
      { id: 'cam2', name: 'Lobby Camera' },
    ],
  });
});

module.exports = router;
