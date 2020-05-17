const express = require('express');
const router = express.Router();

const GalleryModel = require('../models/GalleryModel');
const ResponseClass = require('../models/ResponseClass');

router.get('/', function(req, resp, next) {
  GalleryModel.getAll(function(error, returnData){
    let response = new ResponseClass();

    if(error) {
      response.erro = true;
      response.msg = "Oops some error here..." + error.message;
      console.log("error: ", error.message);
    } else {
      response.data = returnData;
    }
    resp.json(response);
  })
});

module.exports = router;