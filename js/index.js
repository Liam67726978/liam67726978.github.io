// API地址
const BASE_URL = "https://webdev.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/movies/";
const POSTER_URL = BASE_URL + "/posters/";
// 電影渲染節點
const dataPanel = document.querySelector("#data-panel");
// 分頁器節點
const paginator = document.querySelector("#paginator");
// 獲取的電影資料
const movies = [];
// 一頁顯示的電影數量
const MOVIES_PER_PAGE = 12;

// 向 API 地址發送請求
axios.get(INDEX_URL).then((response) => {
  // 將獲取的電影資料放進 movies
  movies.push(...response.data.results);
  // 渲染電影資料
  renderMovieList(getMoviesByPage(1));
  // 渲染分頁器
  renderPaginator(movies.length);
});

// 電影卡片事件
dataPanel.addEventListener("click", function onPanelClicked(event) {
  const target = event.target;
  //點擊more
  if (target.matches(".btn-show-movie")) {
    // 跳出電影資訊 Modal
    showMovieModal(target.getAttribute("data-id"));
  }
  //點擊 + 添加最愛
  else if (target.matches(".btn-add-favorite")) {
    // 加到最愛清單
    addToFavorite(target.getAttribute("data-id"));
  }
});

// 分頁器事件
paginator.addEventListener("click", function (event) {
  if (event.target.tagName !== "A") return flase;

  renderMovieList(getMoviesByPage(event.target.getAttribute("data-page")));
});
