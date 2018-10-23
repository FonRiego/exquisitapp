const express = require('express');
const router  = express.Router();
const Story = require('../models/Story')
const User = require('../models/User')
const Collab = require('../models/Collab')

/* GET home page OLD */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });


router.get('/', (req, res, next) => {
  Story.find({"open": false})
  .populate({ 
    path: 'collaborations',
    populate: {
      path: 'user'
    } 
  })
  .populate('users')
  .then(stories => {
    res.render('index', {stories})
  })
  .catch(e => console.log(e))
})

module.exports = router;
