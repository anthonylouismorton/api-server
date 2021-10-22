'use strict';

const express = require('express');
const router = express.Router();
const {Employee, Location} = require('../model')

const Collection = require('../model/lib/Collection.js')
const modelMap = {
  Employee: new Collection(Employee),
  Location: new Collection(Location),
}

router.use('/:model', function(req, res, next){

    const model = modelMap[req.params.model];
    if(!model) {
      next('no model found')
    }
    //const method = req.method;
    req.model = model;
    next();
}),


router.get('/:model', async (req, res, next) => {
  const model = req.model;
  let records = await model.read(req.params.id);
  res.send(records)
})

router.get('/:model/:id', async (req, res, next) => {
  const model = req.model;
  const id = req.params.id;
  let record = await model.read(id);
  res.send(record);
})

router.post('/:model', async (req, res, next) => {
  const model = req.model;
  const json = req.body
  let newRecord = await model.create(json);
  res.send(newRecord);
})

module.exports = router;