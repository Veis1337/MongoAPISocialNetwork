const mongoose = require('mongoose');
mongoose.set('toJSON', { getters: true });

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 300,
            minlenght: 1,
            trim: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
        userName: {
            type: String,
            required: true,
        },
    }, {
        toJSON: { getters: true },
});

module.exports = reactionSchema;