const express = require('express');
const router  = express.Router();
const Story = require('../models/Story')
const User = require('../models/User')
const Collab = require('../models/Collab')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
