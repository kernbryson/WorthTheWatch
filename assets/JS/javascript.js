let imdbUrl = "https://imdb-api.com/en/API/Search/k_w0qs6e0f/";
let imdbGenreUrl = "https://imdb-api.com/API/AdvancedSearch/k_w0qs6e0f?genres=";
let imdbGenre_title_Url =
  "https://imdb-api.com/API/AdvancedSearch/k_w0qs6e0f?title=";

let imdbKey = "k_w0qs6e0f";

let searchValue = "";
let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-input");

$(".button").click(search);

// getting the search movie from the input box
function search(event) {
  genre = $(event.target)[0].getInnerHTML();
  if (genre == "Search") genre = null;
  searchValue = searchInput.value;
  console.log(searchValue);
  $("#allMovies").empty();
  getMovies(genre, searchValue);
}

// fetching the searched movie from imbd server
function getMovies(genre, searchValue) {
  var finalUrl = "";
  if (genre != null && searchValue != null && searchValue != "") {
    finalUrl = imdbGenreUrl + genre + "&title=" + searchValue;
  } else if (genre != null) {
    finalUrl = imdbGenreUrl + genre;
  } else {
    finalUrl = imdbGenre_title_Url + searchValue;
  }
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayMovies(data.results);
    })
    .catch(() => console.log("Error"));
}

//creating dynamic card for search results to display
function displayMovies(resultsMovie) {
  for (var i = 0; i < resultsMovie.length; i++) {
    var card = $("<div>").addClass("card");
    var title = $("<div>")
      .addClass("card-header h5")
      .text(resultsMovie[i].title);

    var figure = $("<figure>").addClass("image is-128x128");
    var imgIcon = $("<img>").attr("src", resultsMovie[i].image);
    figure.append(imgIcon);
    var myId = resultsMovie[i].id;
    // making image card clickable
    imgIcon.wrap(
      "<a id='a" + myId + "' href=" + "./movies.html?id=" + myId + "></a>"
    );
    //var link = $("#a"+ myId).attr({href:},{id:resultsMovie[i].id});

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
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
    getLocal();

  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    console.log($target);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});

// getting previous search movies from local storage and display on modal
function getLocal() {
  let moviesArray = JSON.parse(localStorage.getItem("history"));
  let moviesListItems = [];
  let olControl = $("#movieList");
  moviesArray.forEach((movie) => {
    let listItem = document.createElement("li");
    let aElement = document.createElement("a");
    aElement.href = "movies.html?id=" + movie["MovieId"];
    aElement.text = movie["Title"];
    listItem.append(aElement);
  
    moviesListItems.push(listItem);
  });
  olControl.empty();
  olControl.append(moviesListItems);
  return moviesListItems;
}
