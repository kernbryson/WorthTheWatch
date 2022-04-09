let imdbUrl = "https://imdb-api.com/en/API/Search/k_w0qs6e0f/";
let imdbKey = "k_w0qs6e0f";
// let movieDescUrl =
//   "https://imdb-api.com/en/API/Report/k_w0qs6e0f/" + movieId + "/Wikipedia,";
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
}
function getMovies(searchValue) {
  fetch(imdbUrl + searchValue)
    .then((response) => response.json())
    .then((data) => {
      //get movie title
      console.log(data);
      let list = document.createElement("li");
      let title = data["results"]["0"]["title"];
      let titleName = document.createElement("h1");
      titleName.classList.add("movietitle");
      list.append(titleName);
      titleName.textContent = title;
      //get movie date
      let releaseDate = data["results"]["0"]["description"];
      let movieDate = document.createElement("h2");
      movieDate.classList.add("movierelease");
      console.log(releaseDate);
      list.append(movieDate);
      movieDate.textContent = releaseDate;
      //get movie image
      let imageList = document.createElement("img");
      let moviePoster = data["results"]["0"]["image"];
      imageList.classList.add("picture");
      imageList.src = moviePoster;
      ulMovie.append(list);
      list.append(imageList);
      console.log(moviePoster);
      let movieId = data["results"]["0"]["id"];

      console.log(title);
      //   getDesc(movieId, list);
      getReviews(movieId, list);
    });
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
function getReviews(movieId, list) {
  fetch("https://imdb-api.com/en/API/MetacriticReviews/k_w0qs6e0f/" + movieId)
    .then((response) => response.json())
    .then((data) => {
      let publisherdata = data["items"]["0"]["publisher"];
      let reviewdata = data["items"]["0"]["content"];
      let review = document.createElement("p");
      review.textContent = reviewdata;
      list.append(review);
      let movieScoredata = data["items"]["0"]["rate"];
      let movieScore = document.createElement("p");
      movieScore.textContent = movieScoredata + "/100";
      list.append(movieScore);
      let publisher = document.createElement("p");
      publisher.textContent = publisherdata;
      list.append(publisher);
      console.log(data);
      review.classList.add("review");
      movieScore.classList.add("moviescore");
      publisher.classList.add("publisher");
    });
}
