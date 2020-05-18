const db = require('../database/dbConnection.js');

module.exports = class GalleryModel {

  static getAll(callback) {
    return db.query("select * from videos", callback);
  }

  static getId(id, callback) {
    return db.query("select * from videos where video_id = ?", [id], callback);
  }

  static addVideo(data, callback) {
    return db.query("insert into videos (video_title, video_path) values(?, ?)",
    [data.video_title, data.video_path], callback);
  }

  static edit(data, callback) {
    if(data.video_path != null) {
      return db.query("update videos set video_title = ?, video_path = ? where video_id = ?",
      [data.video_title, data.video_path, data.video_id], callback);
    } else {
      return db.query("update videos set video_title = ? where video_id = ?",
      [data.video_title, data.video_id], callback);
    }
  }
}

