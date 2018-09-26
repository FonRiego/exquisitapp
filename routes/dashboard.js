const express = require('express');
const router  = express.Router();
const Story = require('../models/Story')
const User = require('../models/User')
const Collab = require('../models/Collab')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/dashboard', ensureLoggedIn('/login'), (req, res, next) => {
  let user = req.user._id;
  Story.find({"open": true, "users": {$ne: user._id}})
  .populate({ 
    path: 'collaborations',
    populate: {
      path: 'user'
    } 
  })
  .populate('users')
  .then(stories => {
    res.render('dashboard', {stories})
  })
})


module.exports = router;