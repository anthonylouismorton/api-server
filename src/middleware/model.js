'use strict'

module.exports = function (req, res, next) {
  const model = req.params.model;
  if(model){
    console.log('in the middleware')
    next();
  }
  else{
    next('no model')
  }

}