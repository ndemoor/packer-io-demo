var _    = require("underscore"),
    AWS  = require("aws-sdk"),
    Util = require("util");

module.exports = (function () {
  var Photo = function (options) {
    if (typeof options === "undefined") {
      options = {};
    }

    _.defaults(this, _.extend({
      key           : null,
      dateModified  : null
    }, options));

    this.init();
  };

  // Prototype
  Photo.prototype = {
    init: function () {
      this.url = Photo.getBucketUrl() + "/" + this.key;
    }
  };

  // Statics
  Photo.getS3 = function() {
    if (typeof Photo.__S3 === "undefined") {
      // First make sure the config is up-to-date
      AWS.config.update(app.get("config").AWS);

      // Initialize
      var s3 = new AWS.S3();
      Photo.__S3 = s3;
    }

    return Photo.__S3;
  };

  Photo.getBucketUrl = function () {
    return Util.format(
      "https://s3-%s.amazonaws.com/%s",
      app.get("config").AWS.region,
      app.get("config").S3.bucket
    );
  };

  Photo.getPhotos = function (limit, callback) {
    // Default limit parameter
    if (typeof limit === "undefined") {
      limit = 100;
    }

    Photo.getS3().listObjects({
      Bucket  : app.get("config").S3.bucket,
      MaxKeys : limit,
      Prefix  : "photos/"
    }, function objectsReceived(error, response) {
      try {
        if (error) {
          throw error;
        }
        else if (typeof response.Contents === "undefined" || response.Contents === null) {
          throw new Error("Request failure");
        }

        // Process response
        var photos = [];
        while (response.Contents.length > 0) {
          var photoObject = response.Contents.pop();

          if (photoObject.Key !== "photos/") {
            var photo = new Photo({
              key          : photoObject.Key,
              dateModified : photoObject.LastModified
            });

            photos.push(photo);
          }
        }

        callback(null, photos);
      }
      catch (_error) {
        callback (_error, null);
      }
    });
  };

  return Photo;
})();