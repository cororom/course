(function () {
  const searchSection = document.querySelector(".search-main .search-section");
  const detailSection = document.querySelector(".detail-main .search-section");

  if (searchSection) {
    searchSection.addEventListener("click", (event) => {
      handleSearch(event);
    });
  }
  if (detailSection) {
    detailSection.addEventListener("submit", (event) => {
      handleSearch(event);
    });
  }

  const ranking = document.querySelector(".popular-ranking");

  const handleSearchContent = async (keyword) => {
    const url = parseUrl(location.href);
    let pathQuery = url.pathname.split("/");
    pathQuery.pop();
    url.pathname = pathQuery.join("/");
    const newUrl = `${url.origin}${url.pathname}/detail_search.html?keyword=${keyword}`;
    await getPage(newUrl).then((data) => {
      history.pushState(null, null, newUrl);
      document.documentElement.innerHTML = data;
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    const input = target.querySelector("input");
    if (input !== null && input.value.trim() === "") {
      alert("검색어를 입력해주세요.");
      return false;
    }
    const keyword = input !== null ? input.value : "";
    const url = parseUrl(location.href);
    let pathQuery = url.pathname.split("/");
    pathQuery.pop();
    url.pathname = pathQuery.join("/");
    const newUrl = `${url.origin}${url.pathname}/detail_search.html?keyword=${keyword}`;
    history.pushState(null, null, newUrl);
    handleSearchContent(keyword);
  };

  if (ranking) {
    const word = ranking.querySelectorAll("li");
    if (word.length > 0) {
      word.forEach((element) => {
        element.addEventListener("click", handleSearch);
      });
    }
  }

  const historyInput = document.querySelector(".search-form input");

  const handleHistorySection = (event, type) => {
    event.preventDefault();
    const historySection = document.querySelector(".search-history");
    if (type === "open") {
      if (historySection.classList.contains("d-none")) {
        historySection.classList.remove("d-none");
      }
    } else {
      if (!historySection.classList.contains("d-none")) {
        historySection.classList.add("d-none");
      }
    }
  };

  if (historyInput) {
    historyInput.addEventListener("click", (event) => {
      handleHistorySection(event, "open");
    });
  }

  const historyList = document.querySelectorAll(".history-body");

  const handleHistorySearch = (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    const keyword = target.querySelector(".history-name").textContent;
    const url = parseUrl(location.href);
    const newUrl = `${url.origin}${url.pathname}?keyword=${keyword}`;
    history.pushState(null, null, newUrl);
    handleSearchContent(keyword);
  };

  if (historyList.length > 0) {
    historyList.forEach((element) => {
      element.addEventListener("click", handleHistorySearch);
    });
  }

  const historyClose = document.querySelector(".history-header .history-close");

  if (historyClose) {
    historyClose.addEventListener("click", (event) => {
      handleHistorySection(event, "close");
    });
  }

  const historyDeleteAll = document.querySelector(".history-delete-all");
  const historyDelete = document.querySelectorAll(".history-delete");

  const handleHistoryDelete = (event) => {
    const target = event.currentTarget;
    let param = { command: "deleteHistory", type: "all" };
    if (target.classList.contains("history-delete")) {
      param.type = "single";
      const body = target.closest(".history-body");
      const name = body.querySelector(".history-name").textContent;
      param.name = name;
    }
    postData("api.php", param).then((data) => {
      console.log(data);
    });
  };

  if (historyDeleteAll) {
    historyDeleteAll.addEventListener("click", handleHistoryDelete);
  }
  if (historyDelete.length > 0) {
    historyDelete.forEach((element) => {
      element.addEventListener("click", handleHistoryDelete);
    });
  }

  const detailClose = document.querySelector(".detail-header .detail-close");

  const handleDetailClose = async () => {
    const url = parseUrl(location.href);
    let pathQuery = url.pathname.split("/");
    pathQuery.pop();
    url.pathname = pathQuery.join("/");
    const newUrl = `${url.origin}${url.pathname}/index.html#search`;
    //location.href = newUrl;
    await getPage(newUrl).then((data) => {
      history.pushState(null, null, newUrl);
      document.documentElement.innerHTML = data;
    });
  };

  if (detailClose) {
    detailClose.addEventListener("click", handleDetailClose);
  }
})();
