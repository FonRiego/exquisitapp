// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Story = require("../models/Story");
const Collab = require("../models/Collab");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/exquisitapp', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alicia",
    password: bcrypt.hashSync("alicia", bcrypt.genSaltSync(bcryptSalt)),
    _id: "57e5a5e00000000000000000"
  },
  {
    username: "miguel",
    password: bcrypt.hashSync("miguel", bcrypt.genSaltSync(bcryptSalt)),
    _id: "560320e00000000000000000"
  },
  {
    username: "laura",
    password: bcrypt.hashSync("laura", bcrypt.genSaltSync(bcryptSalt)),
    _id: "5421ed600000000000000000"
  },
  {
    username: "jaime",
    password: bcrypt.hashSync("jaime", bcrypt.genSaltSync(bcryptSalt)),
    _id: "5240b9e00000000000000000"
  }
];


let collabs = [
  {
    content: "Ricitos de oro",
    _id: "505f86600000000000000000",
    user: "57e5a5e00000000000000000"
  },
  {
    content: "cantaba alegremente",
    _id:"4e7d01600000000000000000",
    user: "560320e00000000000000000"
  },
  {
    content: "mientras comía sopa.",
    _id: "4c9bcde00000000000000000",
    user: "5421ed600000000000000000"
  },
  {
    content: "El perro loco",
    _id: "4aba9a600000000000000000",
    user: "5240b9e00000000000000000"
  },
  {
    content: "escribe poemas",
    _id: "48d966e00000000000000000",
    user: "57e5a5e00000000000000000"
  },
  {
    content: "en Ironhack.",
    _id: "46f6e1e00000000000000000",
    user: "560320e00000000000000000"
  },
  {
    content: "Un sujeto aleatorio",
    _id: "4515ae600000000000000000",
    user: "5421ed600000000000000000"
  }
];

let stories = [
  {
    image_url: "https://media2.giphy.com/media/10ekBDyASNhpjW/giphy.gif",
    collaborations: ["505f86600000000000000000", "4e7d01600000000000000000", "4c9bcde00000000000000000"],
    open: false
  },
  {
    image_url: "https://media3.giphy.com/media/115b3f0h7hcyPe/giphy.gif",
    collaborations: ["4aba9a600000000000000000", "48d966e00000000000000000","46f6e1e00000000000000000"],
    open: false
  },
  {
    image_url: "https://media0.giphy.com/media/10nj5HRy4HGn3a/giphy.gif",
    collaborations: ["4515ae600000000000000000"],
    open: true
  }
];


User.create(users)
.then(usersCreated => {
  console.log(` users created`);
})
.then( () => {
  return Collab.create(collabs)
})
.then(collabsCreated => {
  console.log(collabsCreated);
})
.then( () => {
  return Story.create(stories)
})
.then(storiesCreated => {
  console.log(storiesCreated);
})
.then(() => {
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})