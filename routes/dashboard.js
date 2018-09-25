const express = require('express');
const router  = express.Router();
const Story = require('../models/Story')
const User = require('../models/User')
const Collab = require('../models/Collab')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/dashboard', ensureLoggedIn('/login'), (req, res, next) => {
  Story.find({"open": false})
  .populate({ 
    path: 'collaborations',
    populate: {
      path: 'user'
    } 
  })
  .then(stories => {
    res.render('dashboard', {stories})
  })
})


module.exports = router;