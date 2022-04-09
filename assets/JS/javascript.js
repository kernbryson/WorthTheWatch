let imdbUrl = "https://imdb-api.com/en/API/Search/k_w0qs6e0f/";
let imdbKey = "k_w0qs6e0f";
let rottenUrl =
  "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=";
let rottenKey = "bpmqxh5zby5g7xkdqqhsfypq";
let tmdUrl = "https://api.themoviedb.org/3/search/movie?";
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
  getRotten(searchValue);
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

      console.log(title);
    });
  //   let list = document.createElement("li");
  //   let imageList = document.createElement("img");
  //   let moviePoster = data["results"]["0"]["image"];
}
function getTMDB() {
  fetch(rottenUrl + rottenKey)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
