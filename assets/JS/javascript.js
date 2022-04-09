let imdbKey = "k_w0qs6e0f";
let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-input");
let selectGenre = document.querySelector("#genre");
searchBtn.addEventListener("click", search);
function search() {
  let searchValue = searchInput.value;
   searchGenre = selectGenre.textContent;
  console.log(searchValue);
  getMovies(searchValue);
}
function getMovies(searchValue, searchGenre) {
  fetch(
    "https://imdb-api.com/API/AdvancedSearch/k_w0qs6e0f?title=" +
      searchValue +
      "&title_type=feature&genres=" +
      genre
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
