const router = require('express').Router();
const eventCtrl = require('./../controllers/eventCtrl');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

// Express servers receive data from the client side through the req object
// in three instances: the req.params, req.query, and req.body objects
// req.params  '/:userid'
// req.query '/search'
// use the req.body object to receive data through POST and PUT requests in the Express server

router
  .route('/')
  .get(eventCtrl.getEvent)
  .post(isAuthenticated, authorizeRoles('donor'), eventCtrl.createEvent);

router
  .route('/ticket')
  .get(isAuthenticated, authorizeRoles('user'), eventCtrl.getEventByUser);

router.route('/search').get(eventCtrl.searchEvent);

router.route('/home').get(eventCtrl.getHomeEvents);

router
  .route('/donor')
  .get(isAuthenticated, authorizeRoles('donor'), eventCtrl.getEventByDonor);

router
  .route('/:id')
  .delete(
    isAuthenticated,
    authorizeRoles('donor', 'admin'),
    eventCtrl.deleteEvent
  )
  .patch(isAuthenticated, authorizeRoles('user'), eventCtrl.registerEvent);

router
  .route('/edit/:id')
  .patch(isAuthenticated, authorizeRoles('donatur'), eventCtrl.updateEvent);
  
module.exports = router;
