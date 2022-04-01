const express = require('express');
const router = express();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

router.post('/login', async(req, res) => {
    try {
        let { email, password } = req.body;
        let admin = await Admin.findOne({ email }, { email: 1, password: 1 });
        if (!admin)
            return res
                .status(401)
                .json({ success: false, msg: 'Invalid Admin Email' });

        if (password !== admin.password)
            return res.status(401).json({ success: false, msg: 'Invalid password' });
        let payload = {
            admin_Id: admin._id,
        };
        // console.log(payload);
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 1 * 60 * 60,
        });
        // console.log(token);
        await Admin.updateOne({ _id: admin._id }, { token });
        admin = await Admin.findOneAndUpdate({ _id: admin._id }, { $set: { token } }, { new: true }).select({ password: 0 });
        console.log('Admin Signed in Successfully');
        return res.status(200).json({
            msg: 'Admin Signed in Successfully ',
            success: true,
            data: admin,
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
});

router.post('/logout', async(req, res) => {
    try {
        let token = req.headers['authorization'];
        let admin = await Admin.exists({ token });
        if (admin) {
            await Admin.updateOne({ _id: admin._id }, {
                $set: {
                    token: null,
                },
            });
            return res.status(200).send({
                success: true,
                msg: 'Logged Out Successfully',
            });

        } else {
            return res.status(400).send({ success: false, msg: 'Not Logged In' });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
});

module.exports = router;