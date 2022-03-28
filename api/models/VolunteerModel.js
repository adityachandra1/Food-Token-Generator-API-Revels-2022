/// vlunteer : email, cat -ref , obj {date arr, token, isRedeemed} , role { VoLun, Org};
const mongoose = require('mongoose');

const token_object = {
    issueTime: {
        type: Date
    },
    token: {
        type: String
    },
    isRedeemed: {
        type: Boolean
    }
}

const VolunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["ORGANISER", "VOLUNTEER"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    foodTokens: [{
        type: token_object
    }]
},
    { timestamps: true }
);

module.exports = Volunteer = mongoose.model('Volunteer', VolunteerSchema);
