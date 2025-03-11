// src/api/routes/carbonCredits.js
router.post('/iot-data', async (req, res) => {
    try {
      const { sensorId, value } = req.body;
      // Process the IoT data here
      console.log(`Received data from sensor ${sensorId}: ${value}`);
      res.json({ success: true });
    } catch (error) {
      console.error('Error processing IoT data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });