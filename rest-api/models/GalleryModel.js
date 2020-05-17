const db = require('../database/dbConnection.js');

module.exports = class GalleryModel {
  static getAll(callback) {
    return db.query("select * from videos", callback);
  }
}