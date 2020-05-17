const express = require('express');
const router = express.Router();

const GalleryModel = require('../models/GalleryModel');
const ResponseClass = require('../models/ResponseClass');

let publicFolder = './public/files';

let multer = require('multer');
let path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, publicFolder)
  },
  filename: function (req, file, cb) {
    //cb(null, file.fieldname + '-' + Date.now())
    let fileName = `${file.fieldname.replace(/\//g, '')}-${Date.now()}${path.extname(file.originalname)}`;
    req.body.path = publicFolder + fileName;
  }
})

var upload = multer({storage: storage});

router.post('/', function(req, resp, next) {
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

router.get('/:id?', function(req, resp, next) {
  GalleryModel.getId(req.params.id, function(error, returnData){
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