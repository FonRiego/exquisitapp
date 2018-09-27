const express = require('express');
const router  = express.Router();
const Story = require('../models/Story')
const User = require('../models/User')
const Collab = require('../models/Collab')
const Comment = require('../models/Comment')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/story/new', ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render("stories/new")
});

router.post('/story/new', ensureLoggedIn('/auth/login'), (req, res, next) => { 
  let content = req.body.content;
  let image_url = req.body.image_url;
  let user = req.user._id;
  Collab.create({content, user})
  .then( collab => {
    return Story.create({
      collaborations: [collab._id],
      users: [user._id],
      image_url
    })
  })
  .then( story => {
    res.redirect("/dashboard");
  })
  .catch(e => next(e))
});

router.get('/story/:id', (req,res, next) => {
  let message = "";
  if (req.query.valid) {
    message = req.query.valid
  }
  let id = req.params.id

  const prom1= Story.findById(id)
  .populate({ 
    path: 'collaborations',
    populate: {
      path: 'user'
    } 
  })

  const prom2 = Comment.find({story: id})
  .populate("story")
  .populate("user")

  Promise.all([prom1, prom2])
  .then(([story, comments]) => {
    if (story.open){
      let middle = false;
      if (story.collaborations.length == 1) {
        middle = true;
      }
      res.render('stories/continue-story', {story, middle})
    } else { 
      console.log(story)
      res.render('stories/finished-story', {story, comments, message})
    }
  })
  .catch(e => console.log(e))
})

router.post('/story/:id/newcomment', ensureLoggedIn('/auth/login'), (req, res, next) => {
  let content = req.body.content;
  let user = req.user._id;
  let story = req.params.id;
  if (content === "") {
    let message=encodeURIComponent('El comentario no puede estar vacío')
    res.redirect(`/story/${story}/?valid=` + message)
  } else {
  Comment.create({content, user, story})
  .then( comment =>{
    console.log(comment)
    res.redirect(`/story/${comment.story}`)
  })
  .catch(e => console.log(e))
  }
})

router.post('/story/:id', ensureLoggedIn('/auth/login'), (req, res, next) => {
  let id = req.params.id;
  let image_url = req.body.image_url;
  let content = req.body.content;
  let user = req.user._id;
  Collab.create({content, user, image_url})
  .then( collab => {
    return Story.findByIdAndUpdate(id, { $push: { collaborations: collab._id, users: user._id}}, {new: true})
  })
  .then( story => {
    if (story.collaborations.length == 3){
      return Story.findByIdAndUpdate(id, { open: false})
      .then( story => {
        res.redirect(`/story/${id}`)
      })
    } else {
      res.redirect('/dashboard')
    }
  })
})


module.exports = router;