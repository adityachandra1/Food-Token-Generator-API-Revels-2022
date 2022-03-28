const express = require("express");
const mongoose = require('mongoose');
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');
const router = express.Router();

const FoodToken = require('../models/tokenModel');
const Statistics = require('../models/statisticsModel');

const maxAge = 3 * 60 * 60;
const createToken = (email) => {
    return jwt.sign({ email }, 'HFS', { expiresIn: maxAge });
}

function isTokenExpired(token) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    const expired = (Date.now() >= exp * 1000)
    return expired;
}

router.post('/create-token', async (req, res) => {
    try {
        const { name, email, category, issuedBy } = req.body;
        const foodToken_jwt = createToken(email);
        let link = 'https://www.google.com/search?q=' + foodToken_jwt;
        const item = await FoodToken.create({ name, email, category, issuedBy, token: foodToken_jwt, qrLink: link });

        const stats = await Statistics.findOne({ category: token.category });
        let count = stats.tokensIssued + 1;
        stats = await Statistics.findOneAndUpdate({ category: token.category }, { tokensIssued: count });

        console.log(item);
        return res.status(200).json({ message: "Success", data: item });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.toString() });
    }
});

//add hfs check  logged in here
router.post('/redeem-token', async (req, res) => {
    try {
        const token = await FoodToken.findOne({ qrLink: req.body.qrLink });
        if (!token) {
            return res.status(404).json({
                message: 'Food Token not found or has already been redeemed',
            });
        }
        
        const stats = await Statistics.findOne({ category: token.category });
        let count = stats.tokensRedeemed + 1;
        stats = await Statistics.findOneAndUpdate({ category: token.category }, { tokensRedeemed: count });

        await FoodToken.deleteOne({ qrLink: req.body.qrLink }); // updte
        return res.send({
            success: true,
            data: token,
            msg: 'Token Redeemed Successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.toString() });
    }
});

module.exports = router;