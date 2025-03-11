const axios = require('axios');

setInterval(() => {
  const sensorData = {
    sensorId: 'sensor-123',
    value: Math.random() * 100 
    
  };

  axios.post('http://localhost:3000/api/carbon-credits/iot-data', sensorData)
    .then(response => {
      console.log('Data sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
}, 5000); 
