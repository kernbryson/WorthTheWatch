let imdbUrl = "https://imdb-api.com/en/API/Search/k_w0qs6e0f/";
let imdbGenreUrl = "https://imdb-api.com/API/AdvancedSearch/k_w0qs6e0f?genres="

let imdbKey = "k_w0qs6e0f";
let finalArray = [];
let movieArray = ["1", "2", "3", "4", "5", "6", "7", "8"];
// let reviewArray = [];
let movies = "";
let searchValue = "";
let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-input");
let ulMovie = document.querySelector("#movielist");
let reviewApi = "";
searchBtn.addEventListener("click", search);
function search(searchValue) {
  searchValue = searchInput.value;
  console.log(searchValue);
  getMovies(searchValue);
  youtube(searchValue);
}
function getMovies(searchValue) {
  var obj = {};

  fetch(imdbUrl + searchValue)

$(".button").click(search);

function search(event) {
  genre=$(event.target)[0].getInnerHTML();
  if(genre == "Search")
    genre = null;
  searchValue = searchInput.value;
  console.log(searchValue);
  getMovies(genre, searchValue);
}

function getMovies(genre, searchValue) {
  
  var finalUrl = "";
  if(genre != null && searchValue != null && searchValue != ""){
    finalUrl = imdbGenreUrl + genre+ "&title=" + searchValue + "&title_type=feature" ;
  } else if(genre != null){
    finalUrl = imdbGenreUrl + genre  + "&title_type=feature";
  } else {
    finalUrl = imdbUrl + searchValue  + "&title_type=feature";
  }
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      //get movie title
      // movies = "";
      for (i = 0; i < 6; i++) {
        console.log(data);
        let list = document.createElement("div");
        let title = data["results"][movieArray[i]]["title"];
        let titleName = document.createElement("h1");
        titleName.classList.add("movietitle");
        list.append(titleName);
        titleName.textContent = title;
        // //get movie date
        let movieDate = document.createElement("h2");
        movieDate.classList.add("movierelease");
        list.append(movieDate);
        // //get movie image
        let link = document.createElement("a")
        link.setAttribute("href","./pages/movies.html")
        let imageList = document.createElement("img");
        let moviePoster = data["results"][movieArray[i]]["image"];
        imageList.classList.add("picture");
        imageList.src = moviePoster;
        ulMovie.append(list);
        list.append(imageList);
        // console.log(moviePoster);
        let movieId = data["results"]["0"]["id"];
      }
      // console.log(title);
      // obj.releaseDate = data["results"]["0"]["description"];
      // obj.title = data["results"]["0"]["title"];
      // obj.image = data["results"]["0"]["image"];
      // finalArray.push(obj);

      // for (i = 0; i < finalArray.length; i++) {
      //   movies += "<li class='movietitle'>" + finalArray[i].title + "</li>";
      //   movies +=
      //     "<li class='moviepiclist'>" +
      //     "<img class='picture' src='" +
      //     finalArray[i].image +
      //     "'>" +
      //     "</li>";
      //  movies +="<button class='learnmorebtn'>" + "learn more!" + "</button>");
    });
  //   getDesc(movieId, list);
  // getReviews(movieId, movies);
}

// function getDesc(movieId, list) {
//   fetch("https://imdb-api.com/en/API/Wikipedia/k_w0qs6e0f/" + movieId)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       let description = document.createElement("h2");
//       let movieDesc = data["plotShort"]["plainText"];
//       description.classList.add("moviedescription");
//       description.textContent = movieDesc;
//       list.append(description);
//     });
// }
// function getReviews(movieId, movies) {
//   var obj = {};

//   fetch("https://imdb-api.com/en/API/MetacriticReviews/k_w0qs6e0f/" + movieId)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       // let publisherdata = data["items"]["0"]["publisher"];
//       // let reviewdata = data["items"]["0"]["content"];
//       // let review = document.createElement("p");
//       // review.textContent = reviewdata;
//       // list.append(review);
//       // let movieScoredata = data["items"]["0"]["rate"];
//       // let movieScore = document.createElement("p");
//       // movieScore.textContent = movieScoredata + "/100";
//       // list.append(movieScore);
//       // let publisher = document.createElement("p");
//       // publisher.textContent = publisherdata;
//       // list.append(publisher);
//       // console.log(data);
//       // review.classList.add("review");
//       // movieScore.classList.add("moviescore");
//       // publisher.classList.add("publisher");
//       // console.log(movieId);

//       obj.publisher = data["items"]["0"]["publisher"];
//       obj.reviewdata = data["items"]["0"]["content"];
//       obj.movieScoredata = data["items"]["0"]["rate"];
//       reviewArray.push(obj);
//       for (i = 0; i < reviewArray.length; i++) {
//         movies +=
//           "<li class='review'>" + reviewArray[i].reviewdata + "/100" + "</li>";
//         movies += "<li class='publisher'>" + reviewArray[i].publisher + "</li>";
//         movies +=
//           "<li class='moviescore'>" + reviewArray[i].movieScoredata + "</li>";
//       }
//       ulMovie.innerHTML = movies;
//     });
// }
let ytApiKey = "AIzaSyDiOCYClrpn3Cz3dIBf7MCWsD-e9KltnIE";
function youtube(searchValue) {
  fetch(
    "https://youtube.googleapis.com/youtube/v3/search?key=" +
      ytApiKey +
      "&type=video&part=snippet&q=" +
      searchValue +
      "trailer"
  )
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
      var title = $("<div>").addClass("card-header h5").text(resultsMovie[i].title);
      var figure = $("<figure>").addClass("image is-128x128");
      var imgIcon = $("<img>").attr("src", resultsMovie[i].image);
      figure.append(imgIcon);
      
      var genre = $("<p>").addClass("card-text").text("Genre : " + resultsMovie[i].genres);
      var rating = $("<p>").addClass("card-text").text("Rating : " + resultsMovie[i].imDbRating);
      var plot = $("<p>").addClass("card-text").text("Plot : " + resultsMovie[i].plot);
      var cardBody = $("<div>").addClass("card-body");
      cardBody.append(title, genre, rating, plot, figure);
      card.append(cardBody);
      $("#allMovies").append(card);
  }
}