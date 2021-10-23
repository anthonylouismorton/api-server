'use strict'

const app = require('./src/app/index.js')
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3001;
const {db} = require('./src/model/index.js');

// db.drop()
// 	.then(db.sync())
// 	.then(() => app.start(PORT));

db.sync()
  .then(() => {
    app.start(PORT)
  })
  .catch(console.error)