const { Schema, Types, model } = require('mongoose');
const mongoose = require('mongoose');

const thoughtSchema = require('./thoughts');

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,          
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  },

    {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

userSchema
.virtual('friendCount')
.get(function ()
{
  return this.friends.length;
});

const Users = model('Users', userSchema);

module.exports = Users;