const mongoose = require('mongoose');
mongoose.set('toJSON', { getters: true });

const friendSchema = new mongoose.Schema(
    {
        friendId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }, {
        toJSON: { getters: true },
});

module.exports = friendSchema;