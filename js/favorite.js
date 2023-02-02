// API地址
const BASE_URL = "https://webdev.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/movies/";
const POSTER_URL = BASE_URL + "/posters/";

const dataPanel = document.querySelector("#data-panel");
const movies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

renderFavoriteMovieList(movies);

dataPanel.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".btn-show-movie")) {
    // 跳出電影資訊 Modal
    showMovieModal(target.getAttribute("data-id"));
  }
  // 移除電影
  else if (target.matches(".btn-remove-favorite")) {
    removeFavorite(parseInt(target.getAttribute("data-id")));
  }
});

// 如果
window.addEventListener("storage", function (event) {
  if (event.key === "favoriteMovies") {
    const list = JSON.parse(localStorage.getItem("favoriteMovies"));
    renderFavoriteMovieList(list);
  }
});
