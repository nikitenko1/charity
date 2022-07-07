const { Event } = require('./../models/Event');
const { Donor } = require('./../models/Donor');
const { History } = require('./../models/History');

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
            let: { history_id: '$registrant' },
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
            as: 'registrant',
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

  searchEvent: async (req, res) => {
    try {
      const events = await Event.aggregate([
        {
          $match: { name: { $regex: req.query.event } },
        },
        {
          $lookup: {
            from: 'donors',
            localField: 'user',
            foreignField: 'user',
            as: 'donor',
          },
        },
        { $unwind: '$donor' },
      ]);
      return res.status(200).json({ events });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const findEvent = await Event.find({
        id: req.params.id,
        user: req.user._id,
      });
      if (!findEvent) return res.status(404).json({ msg: 'Event not found.' });

      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) return res.status(404).json({ msg: 'Event not found.' });

      return res.status(200).json({ msg: 'Event data has been deleted.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getEventByDonor: async (req, res) => {
    try {
      const events = await Event.aggregate([
        { $match: { user: req.user._id } },
        {
          $lookup: {
            from: 'histories',
            let: { history_id: '$registrant' },
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
            as: 'registrant',
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      return res.status(200).json({ events });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getEventByUser: async (req, res) => {
    try {
      const events = await History.find({ user: req.user._id })
        .sort('-createdAt')
        .populate('event');
      return res.status(200).json({ events });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //  post collection --> {
  //     "title" : "my first post",
  //     "author" : "Jim",
  //     "likes" : 5
  // },

  //   comment collection --> {
  //     "postTitle" : "my first post",
  //     "comment" : "great read",
  //     "likes" : 3
  //  },

  //   db.posts.aggregate([
  //     { $lookup:
  //         {
  //            from: "comments",
  //            localField: "title",
  //            foreignField: "postTitle",
  //            as: "comments"
  //         }
  //     }
  // ])

  //   This query returns the following..
  // {
  //     "title" : "my first post",
  //     "author" : "Jim",
  //     "likes" : 5,
  //     "comments" : [
  //         {
  //             "postTitle" : "my first post",
  //             "comment" : "great read",
  //             "likes" : 3
  //         }
  //     ]
  // },
  getHomeEvents: async (req, res) => {
    try {
      const events = await Event.aggregate([
        { $match: { expireRegistration: { $gt: new Date() } } },
        {
          $lookup: {
            from: 'donors',
            localField: 'user',
            foreignField: 'user',
            as: 'donor',
          },
        },
        {
          $unwind: '$donor',
        },
        { $sort: { createdAt: -1 } },
        { $limit: 4 },
      ]);
      return res.status(200).json({ events });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = eventCtrl;
