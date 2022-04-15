let title = document.querySelector(".titlecall");
let releaseDate = document.querySelector(".releasecall");
let movieRating = document.querySelector(".ratingcall");
let moviePlot = document.querySelector(".plotcall");
let movieGenre = document.querySelector(".genrecall");
let movieDirector = document.querySelector(".writercall");
let movieActors = document.querySelector(".actorscall");
let movieScore = document.querySelector(".rewardscall");
let poster = document.querySelector(".postercall");
let youtubeVideo = document.querySelector(".youtubemovie");

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

var getTrailerLink = function (myId) {
  var apiUrl = "https://imdb-api.com/en/API/Trailer/k_w0qs6e0f/" + myId;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log("You clicked" + data.fullTitle);
      title.textContent = data["title"];
      movieRating.textContent = data["year"];
      youtubeApi(title.textContent, movieRating.textContent);
    })
    .catch(() => console.log("Error"));
};

function getMovieInfo(myId) {
  var apiUrl =
    "https://imdb-api.com/en/API/Title/k_w0qs6e0f/" +
    myId +
    "/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      poster.src = data["posters"]["posters"]["0"]["link"];
      moviePlot.textContent = data["wikipedia"]["plotShort"]["plainText"];
      movieGenre.textContent = data["genres"];
      movieDirector.textContent = data["directors"];
      movieActors.textContent = data["stars"];
      movieRating.textContent = data["contentRating"];
      movieScore.textContent = data["imDbRating"] + "/10";
    })
    .catch(() => console.log("Error"));
}
let ytApiKey = "AIzaSyDiOCYClrpn3Cz3dIBf7MCWsD-e9KltnIE";
function youtubeApi(searchValue, year) {
  fetch(
    "https://youtube.googleapis.com/youtube/v3/search?key=" +
      ytApiKey +
      "&type=video&part=snippet&q=" +
      searchValue +
      year +
      "trailer"
  )
    .then((response) => response.json())
    .then((data) => {
      youtubeVideo.src =
        "https://www.youtube.com/embed/" + data["items"]["0"]["id"]["videoId"];

      console.log(data);
    });
}

var id = getUrlParameter("id");
console.log("You clicked" + id);
getTrailerLink(id);
getMovieInfo(id);

// // function youtube(searchValue) {
// //   fetch(
// //     "https://youtube.googleapis.com/youtube/v3/search?key=" +
// //       ytApiKey +
// //       "&type=video&part=snippet&q=" +
// //       searchValue +
// //       "trailer"
// //   )
// //     .then((response) => response.json())
// //     .then((data) => {
// //       console.log(data);
// //     });
// // }
