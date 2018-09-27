const express = require('express');
const router  = express.Router();
const Story = require('../models/Story')
const User = require('../models/User')
const Collab = require('../models/Collab')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/dashboard', ensureLoggedIn('/auth/login'), (req, res, next) => {
  let user = req.user._id;

  const prom1 = Story.find({"open": true, "users": {$ne: user._id}})
  .limit(4)
  .populate({ 
    path: 'collaborations',
    populate: {
      path: 'user'
    } 
  })
  .populate('users')

  const prom2 = Story.find({"open": false, "users": {$in: user._id}})
  .limit(4)
  .populate({ 
    path: 'collaborations',
    populate: {
      path: 'user'
    } 
  })
  .populate('users')

  const prom3 = Story.find({"open": false})
  .limit(4)
  .populate({ 
    path: 'collaborations',
    populate: {
      path: 'user'
    } 
  })
  .populate('users')

  Promise.all([prom1, prom2, prom3])
  .then(([openstories, mystories, stories]) => {
    res.render('dashboard', {openstories, mystories, stories})
  })
  .catch(e => console.log(e))
})


router.get('/dashboard/openstories', ensureLoggedIn('/auth/login'), (req, res, next) => {
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
      res.render('stories/opened-stories', {stories})
    })
    .catch(e => console.log(e))
  })

  router.get('/dashboard/mystories', ensureLoggedIn('/auth/login'), (req, res, next) => {
    let user = req.user._id;
    Story.find({"open": false, "users": {$in: user._id}})
    .populate({ 
      path: 'collaborations',
      populate: {
        path: 'user'
      } 
    })
    .populate('users')
    .then(stories => {
      res.render('stories/my-completed-stories', {stories})
    })
    .catch(e => console.log(e))
  })

  router.get('/stories', ensureLoggedIn('/auth/login'), (req, res, next) => {
    let user = req.user._id;
    Story.find({"open": false})
    .populate({ 
      path: 'collaborations',
      populate: {
        path: 'user'
      } 
    })
    .populate('users')
    .then(stories => {
      res.render('stories', {stories})
    })
    .catch(e => console.log(e))
  })
  



module.exports = router;