const express = require('express');
const router  = express.Router();
const Story = require('../models/Story')
const User = require('../models/User')
const Collab = require('../models/Collab')

// router.get('/stories/new', (req, res, next) => {
//   Story.find({"open": true})
//   .populate('collaborations')
//   .then(stories => {
//     res.render('stories', {stories})
//   })
// })


//nueva colaboración!!!!

router.post('/new/:storyId', (req, res, next) => { 
  let {content, userId} = req.body; 
  Collab.create({content, user: userId})
  .then( () => {
    console.log("Colaboración creada");
    res.redirect(redirect || '/storyId');
  })
  .catch(e => next(e))
});

//nueva story!!!!

router.post('/new', (req, res, next) => {
  let {content, userId} = req.body;

  Collab.create({content}).populate('user' = userId)
  .then( (collab) => {
    Story.create({})
    .then ( ()   => {
      res.render('');
    })
  .catch(e => next(e))
});

module.exports = router;