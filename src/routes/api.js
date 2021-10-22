'use strict';

const express = require('express');
const router = express.Router();
const {employee, location} = require('../model')
const modelWare = require('../middleware/model.js')
const Collection = require('../model/lib/Collection.js')


const modelMap = {
  employee: new Collection(employee),
  location: new Collection(location),
}

router.use('/:model', modelWare, function(req,res,next){
  const model = modelMap[req.params.model]
  req.model = model
  next();
})

// router.use('/:model', function(req, res, next){

//     const model = modelMap[req.params.model];
//     if(!model) {
//       next('no model found')
//     }
//     //const method = req.method;
//     req.model = model;
//     next();
// }),


router.get('/:model', async (req, res, next) => {
  const model = req.model;
  let records = await model.read();
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

router.put('/:model/:id', async (req,res) => {
  const model = req.model;
  const id = req.params.id;
  const json = req.body;
  let updatedRecord = await model.update(id, json)
  res.send(updatedRecord)
});

router.delete('/:model/:id', async (req, res) => {
  const model = req.model;
  const id = req.params.id;
  let deletedRecord = await model.destroy(id);
  res.status(204).send(deletedRecord)
});

module.exports = router;