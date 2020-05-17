CREATE TABLE videos (
    video_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    video_title VARCHAR(255) NULL,
    video_path TEXT NULL,
    PRIMARY KEY (video_id)
);

INSERT INTO videos(video_title, video_path)
VALUES('Video test 01', 'path_test_001');

INSERT INTO videos(video_title, video_path)
VALUES('Video test 02', 'path_test_002');