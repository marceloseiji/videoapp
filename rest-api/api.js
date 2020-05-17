const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const api = express();
const port = 3000;
const router = express.Router();

const galleyRouter = require("./router/galleryRouter");

api.use(cors());
api.use(bodyparser.urlencoded({extended: true}));
api.use(bodyparser.json({limit: '20mb', extended: true}));

router.get("/", (req, resp) => resp.json({
  message: '=> API Online...'
}));

api.use("/", router);
api.use("/videos", galleyRouter);
api.listen(port);