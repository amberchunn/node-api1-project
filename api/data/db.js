
// Dependencies
const shortid = require('shortid');

const id = shortid.generate();

// Data
const users = [
{
    id: id,
    name: "Doctor Who",
    bio: "Galefrean Runaway"
  },
  {
    id: id,
    name: "River Song",
    bio: "The Doctor's Wife"
  },
  {
    id: id,
    name: "The Master",
    bio: "Can you Hear the Drums?"
  },
  {
    id: id,
    name: "Tardis",
    bio: "Sexy..."
  },
  {
    id: id,
    name: "Captain Jack Harkness",
    bio: "In the Flesh"
  }
]

module.exports = users;
