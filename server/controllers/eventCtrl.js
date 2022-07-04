const { Event } = require('./../models/Event');
const { Donor } = require('./../models/Donor');

const eventCtrl = {
  getEvent: async (req, res) => {
    try {
      const events = await Event.aggregate([
        {
          $lookup: {
            from: 'donors',
            localField: 'user',
            foreignField: 'user',
            as: 'donor',
          },
        },
        {
          $lookup: {
            from: 'histories',
            let: { history_id: '$registrar' },
            pipeline: [
              { $match: { $expr: { $in: ['$_id', '$$history_id'] } } },
              {
                $lookup: {
                  from: 'users',
                  localField: 'user',
                  foreignField: '_id',
                  as: 'user',
                },
              },
              { $unwind: '$user' },
            ],
            as: 'registrar',
          },
        },
        {
          $unwind: '$donor',
        },
        { $sort: { createdAt: -1 } },
      ]);
      return res.status(200).json({ events });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createEvent: async (req, res) => {
    try {
      const {
        name,
        location,
        date,
        expireRegistration,
        category,
        timeStart,
        timesUp,
        capacity,
        description,
        picture,
      } = req.body;

      if (
        !name ||
        !location ||
        !date ||
        !category ||
        !expireRegistration ||
        !timeStart ||
        !timesUp ||
        !description ||
        !capacity ||
        !picture
      )
        return res.status(400).json({
          msg: 'Please provide every field.',
        });

      const findDonor = await Donor.findOne({
        user: req.user._id,
        status: 'verified',
      });
      if (!findDonor)
        return res
          .status(400)
          .json({ msg: 'Donor profile has not been verified.' });

      const newEvent = new Event({
        user: req.user._id,
        name,
        location,
        date,
        expireRegistration,
        category,
        timeStart,
        timesUp,
        capacity,
        description,
        picture,
      });
      await newEvent.save();

      return res.status(200).json({
        msg: 'Event saved successfully.',
        event: newEvent,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = eventCtrl;
