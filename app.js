// https://kinopoiskapiunofficial.tech/documentation/api/#/

const API_KEY = "c8d6f5d3-9ec2-4f45-bd31-8011fb5001a8";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="

getFetch(API_URL_POPULAR);

async function getFetch(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();
  renderMovies(responseData)
}

function renderMovies(data) {
  const moviesElem = document.querySelector(".movies");

  moviesElem.innerHTML = ""

  data.films.forEach(film => {
    const movieElem = document.createElement("div");
    movieElem.className = "movie"
    movieElem.innerHTML = `
        <div class="movie__cover-inner">
          <img class="movie__cover-img" src="${film.posterUrlPreview}" alt="${film.nameRu}">
          <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${film.nameRu}</div>
          <div class="movie__category">${film.genres.map(obj => ` ${obj.genre}`)}</div>
          ${film.rating &&
      `<div class="movie__score movie__score--${changeRatingColor(film.rating)}">${film.rating}</div>`
      }
        </div>
    `
    moviesElem.append(movieElem);
  });
}

function changeRatingColor(score) {
  if (score >= 8) return "green";
  if (score > 6) return "orange";
  if (6 >= score) return "red"
}

const form = document.querySelector("form");
const search = form.querySelector(".header__search");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getFetch(apiSearchUrl);
    search.value = ""
  }
})


