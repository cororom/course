(function () {
  const searchSection = document.querySelector(".search-section");

  if (searchSection) {
    searchSection.addEventListener("click", (event) => {
      handleSearch(event);
    });
  }
  const ranking = document.querySelector(".popular-ranking");

  const handleSearchContent = async (keyword) => {
    const url = parseUrl(location.href);
    let pathQuery = url.pathname.split("/");
    pathQuery.pop();
    url.pathname = pathQuery.join("/");
    postData(`${url.origin}${url.pathname}/api.py`, { keyword: keyword }).then((data) => {
      console.log(data);
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const target = event.target;
    const keyword = target.classList.contains("search-keyword") ? target.textContent : "";
    //let url = getUrl().replace(location.search, "");
    const url = parseUrl(location.href);
    let pathQuery = url.pathname.split("/");
    pathQuery.pop();
    url.pathname = pathQuery.join("/");
    //url = url.indexOf("#") !== -1 ? url.split("#")[0] : url;
    const newUrl = `${url.origin}${url.pathname}/detail_search.html?keyword=${keyword}`;
    history.pushState(null, null, newUrl);
    //handleNavContent("searchDetail");
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

  const handleHistorySection = () => {
    const historySection = document.querySelector(".search-history");
    if (historySection.classList.contains("d-none")) {
      historySection.classList.remove("d-none");
    }
  };

  if (historyInput) {
    historyInput.addEventListener("click", handleHistorySection);
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
})();
