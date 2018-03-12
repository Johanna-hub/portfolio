const express = require('express');
const request = require('request');
const instaCall = require('./insta_call');
const API_key = require('./config.js');

const app = express();
const port = process.env.PORT || 5000;

app.get('/hello', (req, res) => {
  let photo = '';
  request(
    `https://api.instagram.com/v1/users/50899010/media/recent/?access_token=${API_key}`,
    (err, instaRes, body) => {
      const parsedBody = JSON.parse(body);
      const photos = instaCall(parsedBody);
      res.send(JSON.stringify(photos));
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
