const db = require('../database/dbConnection.js');

module.exports = class GalleryModel {

  static getAll(callback) {
    return db.query("select * from videos", callback);
  }

  static getId(id, callback) {
    return db.query("select * from videos where video_id = ?", [id], callback);
  }
}