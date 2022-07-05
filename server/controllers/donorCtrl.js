const { Donor } = require('./../models/Donor');
const { User } = require('./../models/User');

const donorCtrl = {
  completeProfile: async (req, res) => {
    try {
      const { name, owner, nickname, email, address } = req.body;

      if (!name || !owner || !nickname || !email || !address)
        return res.status(400).json({
          msg: 'Fill out all fields in this form.',
        });
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { email },
        { new: true }
      );

      const newDonor = new Donor({
        name,
        owner,
        nickname,
        email,
        address,
        user: req.user._id,
      });
      await newDonor.save();

      return res.status(200).json({ msg: 'Donor profile successfully sent.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUnverifiedDonor: async (req, res) => {
    try {
      const donors = await Donor.find({ status: 'not verified' })
        .sort('-createdAt')
        .populate('user');
      return res.status(200).json({ donors });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = donorCtrl;
