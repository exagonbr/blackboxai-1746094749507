const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Simple API endpoint to check server status
app.get('/api/status', (req, res) => {
  res.json({ status: 'SentinelID backend running' });
});

// WebSocket connection for real-time alerts
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  ws.on('message', (message) => {
    console.log('Received from client:', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});

// Example function to call Python DeepFace microservice
function callDeepFaceService(imagePath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', ['deepface_service.py', imagePath]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('DeepFace error:', data.toString());
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(result);
      } else {
        reject(new Error('DeepFace process exited with code ' + code));
      }
    });
  });
}

server.listen(PORT, () => {
  console.log(`SentinelID backend running on port ${PORT}`);
});
