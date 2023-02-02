const searchFrom = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
// 符合關鍵字的電影
let filteredMovies = [];

searchFrom.addEventListener("submit", function (event) {
  // 取消預設事件
  event.preventDefault();
  // 搜索的關鍵字
  const keyword = searchInput.value.trim().toLowerCase();
  // 儲存符合搜索關鍵字的電影
  // 沒有輸入內容跳出錯誤信息
  if (!keyword.length) {
    alert("請輸入有效字串");
    searchInput.value = "";
    searchInput.focus();
  }
  // 比對關鍵字，符合條件的電影加入 filteredMovies 陣列
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );
  if (searchInput.value && !filteredMovies.length) {
    dataPanel.innerHTML = "";
    paginator.innerHTML = "";
    return false;
  }
  // 重新渲染電影頁面
  renderMovieList(getMoviesByPage(1));
  // 渲染分頁器
  renderPaginator(filteredMovies.length);
});

searchInput.addEventListener("input", function () {
  // 搜索的關鍵字
  const keyword = searchInput.value.trim().toLowerCase();
  // 比對關鍵字，符合條件的電影加入 filteredMovies 陣列
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );
  if (searchInput.value && !filteredMovies.length) {
    dataPanel.innerHTML = "";
    paginator.innerHTML = "";
    return false;
  }
  // 重新渲染電影頁面
  renderMovieList(getMoviesByPage(1));
  // 渲染分頁器
  renderPaginator(filteredMovies.length);
});
