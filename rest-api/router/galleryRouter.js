const express = require('express');
const router = express.Router();

const GalleryModel = require('../models/GalleryModel');
const ResponseClass = require('../models/ResponseClass');

router.get('/', function(req, resp, next) {
  GalleryModel.getAll(function(error, data){
    let response = new ResponseClass();

    if(error) {
      response.erro = true;
      response.msg = "Oops some error here...";
      console.log("error");
    } else {
      // continuar daqui
    }
  })
});