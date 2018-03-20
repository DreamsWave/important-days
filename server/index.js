const express = require('express');
const firebase = require('firebase');

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/subscribe', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});