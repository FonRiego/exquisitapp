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

router.get('/story/new', (req, res, next) => {
  res.render("stories/new")
});

router.post('/story/new', (req, res, next) => { 
  let content = req.body.content;
  let image_url = req.body.image_url;
  let user = req.user._id;
  Collab.create({content, user})
  .then( collab => {
    return Story.create({
      collaborations: [collab._id],
      image_url
    })
  })
  .then( story => {
    res.redirect("/");
  })
  .catch(e => next(e))
});

router.get('/story/:id', (req,res, next) => {
  let id = req.params.id
  Story.findById(id)
  .populate({ 
    path: 'collaborations',
    populate: {
      path: 'user'
    } 
 })
  .then( story => {
    if (story.open){
      let middle = false;
      if (story.collaborations.length == 1) {
        middle = true;
      }
      res.render('stories/continue-story', {story, middle})
    } else {  
      res.render('stories/finished-story', story)
    }
  })
})

router.post('/story/:id', (req, res, next) => {
  let id = req.params.id;
  let image_url = req.body.image_url;
  let content = req.body.content;
  let user = req.user._id;
  Collab.create({content, user, image_url})
  .then( collab => {
    return Story.findByIdAndUpdate(id, { $push: { collaborations: collab._id } }, {new: true})
  })
  .then( story => {
    if (story.collaborations.length == 3){
      return Story.findByIdAndUpdate(id, { open: false})
      .then( story => {
        res.redirect(`/story/${id}`)
      })
    } else {
      res.redirect('/')
    }
  })
})

// //nueva story!!!!

// router.post('/new', (req, res, next) => {
//   let {content, userId} = req.body;

//   Collab.create({content}).populate('user' = userId)
//   .then( (collab) => {
//     Story.create({})
//     .then ( ()   => {
//       res.render('');
//     })
//   .catch(e => next(e))
// });

module.exports = router;