
let imdbUrl = "https://imdb-api.com/en/API/Search/k_w0qs6e0f/";
let imdbKey = "k_w0qs6e0f";
let rottenUrl =
  "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=";
let rottenKey = "bpmqxh5zby5g7xkdqqhsfypq";
let searchValue = "";
let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-input");

$(".button").click(search);

function search(event) {
  
  genre=$(event.target)[0].getInnerHTML();
  if(genre == "Search")
    genre = null;
  searchValue = searchInput.value;
  console.log(searchValue);
  $("#allMovies").empty();
  getMovies(genre, searchValue);
}

function getMovies(genre, searchValue) {
  
  var finalUrl = "";
  if(genre != null && searchValue != null && searchValue != ""){
    finalUrl = imdbGenreUrl + genre+ "&title=" + searchValue ;//+ "&title_type=feature" ;
  } else if(genre != null){
    finalUrl = imdbGenreUrl + genre ;// + "&title_type=feature";
  } else {
    finalUrl = imdbGenre_title_Url + searchValue;//  + "&title_type=feature";
  }
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function displayMovies(resultsMovie) {
  for (var i = 1; i < resultsMovie.length; i++) {
      var card = $("<div>").addClass("card");      
      var title = $("<div>").addClass("card-header h5").text(resultsMovie[i].title);
      var figure = $("<figure>").addClass("image is-128x128");      
      var imgIcon = $("<img>").attr("src", resultsMovie[i].image); 
      var link = $("<a>").attr("href", "https://www.google.com");
    
      figure.append(imgIcon);

      
      
      var genre = $("<p>").addClass("card-text").text("Genre : " + resultsMovie[i].genres);
      var rating = $("<p>").addClass("card-text").text("Rating : " + resultsMovie[i].imDbRating);
      var plot = $("<p>").addClass("card-text").text("Plot : " + resultsMovie[i].plot);
      var cardBody = $("<div>").addClass("card-body");
      cardBody.append(title, genre, rating, plot, figure,link);
      card.append(cardBody);
      $("#allMovies").append(card);
  }
};
