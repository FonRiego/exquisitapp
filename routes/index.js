const express = require('express');
const router  = express.Router();
const Story = require('../models/Story')
const User = require('../models/User')
const Collab = require('../models/Collab')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/stories', (req, res, next) => {
  Story.find()
  .populate('collaborations')
  .then(stories => {
    res.render('stories', {stories})
  })
})

module.exports = router;
