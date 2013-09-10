module.exports.index = function (req, res, next) {
  app.get("models").Photo.getPhotos(100, function (error, photos) {
    if (error) {
      res.json({ error: "Could not fetch photos. Reason: " + error.message });
    }
    else {
      res.json({ photos: photos });
    }
  });
};