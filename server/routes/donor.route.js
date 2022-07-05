const router = require('express').Router();
const donorCtrl = require('./../controllers/donorCtrl');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

// Express servers receive data from the client side through the req object
// in three instances: the req.params, req.query, and req.body objects
// req.params  '/:userid'
// req.query '/search'
// use the req.body object to receive data through POST and PUT requests in the Express server

router
  .route('/')
  .post(isAuthenticated, authorizeRoles('donatur'), donorCtrl.completeProfile);

router
  .route('/unverified')
  .get(
    isAuthenticated,
    authorizeRoles('admin'),
    donorCtrl.getUnverifiedDonor
  );
module.exports = router;
