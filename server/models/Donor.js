const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: 'event',
    },
  },
  {
    timestamps: true,
  }
);

const Donor = mongoose.model('donor', donorSchema);
module.exports = { Donor };
