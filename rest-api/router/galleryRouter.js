const express = require('express');
const router = express.Router();

const GalleryModel = require('../models/GalleryModel');
const ResponseClass = require('../models/ResponseClass');

let publicFolder = '../rest-api/public/files';

let multer = require('multer');
let path = require('path');
let fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, publicFolder);
  },
  filename: function (req, file, cb) {
    let fileName = `${file.fieldname.replace(/\//g, '')}-${Date.now()}${path.extname(file.originalname)}`;
    req.body.video_path = publicFolder + fileName;
    cb(null, fileName);
  }
})

var upload = multer({storage: storage});

function deleteFile(path) {
  if(path != null) {
    fs.unlinkSync(path);
    console.log('Arquivo deletado');
  }
}

router.post('/', upload.single('video_path'), function(req, resp, next) {
  let response = new ResponseClass();

  

  if(req.body.video_title != null) {

    GalleryModel.addVideo(req.body, function(error, returnData){
      let response = new ResponseClass();
  
      if(error) {
        response.erro = true;
        response.msg = "Oops some error here...";
        console.log("error: ", error.message);
        deleteFile(req.body.path);
      } else {
        if(returnData.affectedRows > 0) {
          response.msg = "Cadastrado com sucesso";
          console.log('req:', req.body.path);
        } else {
          response.erro = true;
          response.msg = "Não foi possível realizar a operação";
          console.log("error: ", error.message);
        }
      }
      console.log('response: ', response);
      resp.json(response);
    })

  } else {
    response.erro = true;
    response.msg = "File not sended";
    console.log("error: ");
    resp.json(response);
  }
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