const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");

router.get("/test", (req, res) => {
  res.send({ message: "For Testing" });
});

router.post("/scan", async (req, res) => {
  const qrImage = await QRCode.toString("Hi testing QR code");
  console.log("qrImage", qrImage);
  // QRCode.toDataURL("Hi testing QR code", opts)
  //   .then((qrImage) => {
  //     console.log("URL", qrImage);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  return res.send({ success: true, data: qrImage });
});

module.exports = router;
