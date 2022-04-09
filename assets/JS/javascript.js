let imdbUrl = "https://imdb-api.com/en/API/Search/k_w0qs6e0f/";
let imdbKey = "k_w0qs6e0f";
let searchValue = "";
let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-input");
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
      console.log(data);
    });
}
