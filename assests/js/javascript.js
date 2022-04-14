let imdbUrl = "https://imdb-api.com/en/API/SearchMovie/k_w0qs6e0f/";
let imdbGenreUrl = "https://imdb-api.com/API/AdvancedSearch/k_w0qs6e0f?genres=";
let imdbGenre_title_Url =
  "https://imdb-api.com/API/AdvancedSearch/k_w0qs6e0f?title=";

let imdbKey = "k_w0qs6e0f";
let rottenUrl =
  "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=";
let rottenKey = "bpmqxh5zby5g7xkdqqhsfypq";
let searchValue = "";
let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-input");

$(".button").click(search);

function search(event) {
  genre = $(event.target)[0].getInnerHTML();
  if (genre == "Search") genre = null;
  searchValue = searchInput.value;
  console.log(searchValue);
  $("#allMovies").empty();
  getMovies(genre, searchValue);
}

function getMovies(genre, searchValue) {
  var finalUrl = "";
  if (genre != null && searchValue != null && searchValue != "") {
    finalUrl = imdbGenreUrl + genre + "&title=" + searchValue; //+ "&title_type=feature" ;
  } else if (genre != null) {
    finalUrl = imdbGenreUrl + genre; // + "&title_type=feature";
  } else {
    finalUrl = imdbGenre_title_Url + searchValue; //  + "&title_type=feature";
  }
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayMovies(data.results);
    })
    .catch(() => console.log("Error"));
}

function displayMovies(resultsMovie) {
  for (var i = 1; i < resultsMovie.length; i++) {
    var card = $("<div>").addClass("card");
    var title = $("<div>")
      .addClass("card-header h5")
      .text(resultsMovie[i].title);

    var figure = $("<figure>");
    var imgIcon = $("<img>").attr("src", resultsMovie[i].image);
    figure.append(imgIcon);
    imgIcon.addClass("imgstyle");
    var id = resultsMovie[i].id;
    imgIcon.wrap("<a></a>");
    var link = $("a").attr({ href: "movies.html" }, { id: resultsMovie[i].id });
    var genre = $("<p>")
      .addClass("card-text")
      .text("Genre : " + resultsMovie[i].genres);
    var rating = $("<p>")
      .addClass("card-text")
      .text("Rating : " + resultsMovie[i].imDbRating);
    var plot = $("<p>")
      .addClass("card-text")
      .text("Plot : " + resultsMovie[i].plot);
    var cardBody = $("<div>").addClass("card-body");
    cardBody.append(title, genre, rating, plot, figure);
    card.append(cardBody);
    $("#allMovies").append(card);
    console.log(id);
  }
}
// imgIcon.addeventlistener("click", )
// function storeMovie(movie) {
//   // localStorage.setItem("movie", movie);
//   console.log(movie);
// }
// // let ytApiKey = "AIzaSyDiOCYClrpn3Cz3dIBf7MCWsD-e9KltnIE";
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
