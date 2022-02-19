const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const { nanoid } = require('nanoid');

router.get('/test', (req, res) => {
  res.send({ message: 'For Testing' });
});

router.post('/scan', async (req, res) => {
  let token = nanoid();
  let link = 'https://www.google.com/search?q=' + token;

  QRCode.toString(link, { type: 'terminal' }, function (err, url) {
    console.log(url);
  });

  return res.send({ success: true, data: link });
});

module.exports = router;
