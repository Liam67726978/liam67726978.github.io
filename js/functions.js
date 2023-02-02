// index.js
// 渲染電影清單
function renderMovieList(data) {
  // 1.創建每筆電影卡片的標籤
  const movieElements = []; // 創建好的標籤
  data.forEach((item) => {
    movieElements.push(
      `<div class="col-sm-6 col-md-4 col-lg-3 col-xxl-2 mb-2">
          <div class="card h-100">
            <img
            src="https://raw.githubusercontent.com/ALPHACamp/movie-list-api/master/public/posters/${item.image}"
            class="card-img-top"
            alt="Movie Poster"
            />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button
              class="btn btn-primary btn-show-movie"
              data-bs-toggle="modal"
              data-bs-target="#movie-modal"
              data-id="${item.id}"
              >
              More
              </button>
              <button 
              class="btn btn-info btn-add-favorite"
              data-id="${item.id}"
              >
              +
              </button>
            </div>
          </div>
       </div>`
    );
  });
  // 2.將創建好的標籤渲染進node節點
  dataPanel.innerHTML = movieElements.join("");
}
// 渲染 Modal
function showMovieModal(id) {
  // 替換的Modal節點
  const modalNodes = {
    modalTitle: document.querySelector("#movie-modal-title"),
    modalImage: document.querySelector("#movie-modal-image"),
    modalDate: document.querySelector("#movie-modal-date"),
    modalDescription: document.querySelector("#movie-modal-description"),
  };
  // 清空Modal資料
  Object.keys(modalNodes).forEach((key) => {
    modalNodes[key].innerHTML = "";
  });
  // 取得電影資料
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results;
    // 替換電影資料
    modalNodes.modalTitle.innerHTML = data.title;
    modalNodes.modalDate.innerHTML = `Release date: ${data.release_date}`;
    modalNodes.modalDescription.innerHTML = data.description;
    modalNodes.modalImage.innerHTML = `
                  <img
                    src="${POSTER_URL + data.image}"
                    alt="movie-poster"
                    class="img-fluid"
                  />`;
  });
}
// 返回點擊的分頁要顯示的電影資料
function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies;
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE);
}

// favorite.js
// 渲染最愛電影清單
function renderFavoriteMovieList(data) {
  // 1.創建每筆電影卡片的標籤
  const movieElements = []; // 創建好的標籤
  data.forEach((item) => {
    movieElements.push(
      `<div class="card-column col-sm-6 col-md-4 col-lg-3 col-xxl-2 mb-2">
          <div class="card h-100">
            <img
            src="https://raw.githubusercontent.com/ALPHACamp/movie-list-api/master/public/posters/${item.image}"
            class="card-img-top"
            alt="Movie Poster"
            />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button
              class="btn btn-primary btn-show-movie"
              data-bs-toggle="modal"
              data-bs-target="#movie-modal"
              data-id="${item.id}"
              >
              More
              </button>
              <button 
              class="btn btn-danger btn-remove-favorite"
              data-id="${item.id}"
              >
              X
              </button>
            </div>
          </div>
       </div>`
    );
  });
  // 2.將創建好的標籤渲染進node節點
  dataPanel.innerHTML = movieElements.join("");
}

// 添加到favorite
function addToFavorite(id) {
  // 取得本地存儲的資料，沒有就返回空陣列
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  // 判斷要添加的電影是否已在 list 中
  if (list.some((movie) => movie.id === parseInt(id))) {
    return alert("此電影已在收藏清單中");
  }
  // 如果沒有，找到要點擊的電影資料，加進list中，放進本地存儲
  else {
    const movie = movies.find((movie) => movie.id === parseInt(id));
    list.push(movie);
    localStorage.setItem("favoriteMovies", JSON.stringify(list));
  }
}

// favorite.js
function removeFavorite(id) {
  // 最愛清單的資料
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  // 要刪除電影的id
  const index = list.findIndex((movie) => movie.id === parseInt(id));
  // 如果最愛清單沒有資料 結束函式
  if (!list || !list.length) return false;

  // 將要刪除的電影從最愛清單移除，並更新 localStorage
  list.splice(index, 1);
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
  // 刪除要刪除的電影的HTML標籤
  event.target.closest(".card-column").remove();
}

//paginator.js
//傳入movies的陣列長度
function renderPaginator(amount) {
  // 顯示的頁數
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE);
  // 創建分頁標籤，插入HTML頁面
  let rawHTML = [];
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML.push(`
    <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>
    `);
  }
  paginator.innerHTML = rawHTML.join("");
}
