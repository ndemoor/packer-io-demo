// Globals
var feed;

// Functions
function feedArticles (response) {
  response.photos.forEach(function (value) {
    var photo = $("<img />");
    photo.attr("src", value.url);

    var article = $("<article />");
    article.append(photo);

    feed.append(article);
  });
}

// On Ready
$(document).ready(function documentIsReady() {
  feed = $("#photos-feed");

  $.get("/photos").success(feedArticles);
});