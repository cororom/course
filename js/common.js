const getUrl = () => {
  return location.href.replace(/\/$/, "");
};

const parseUrl = (url) => {
  return new URL(url);
};

const historyBack = () => {
  window.addEventListener("popstate", () => {
    const returnMenu = location.hash ? location.hash.replace("#", "") : "home";
    handleNavContent(returnMenu);
  });
};

historyBack();

const handlePageInit = (page = "") => {
  if (page === "") {
    const hash = location.hash.replace("#", "");

    if (hash === "") {
      const url = parseUrl(location.href);
      const file = url.pathname.split("/").pop();
      if (file === "detail_reference.html") {
        handleNavContent("related-episode");
      } else {
        handleNavContent("home");
        handleNavContent("video");
        handleNavContent("content-video");
        handleNavContent("saved-course");
      }
    } else {
      handleNavContent(hash);
      if (hash === "mysaved") {
        handleNavContent("content-video");
        handleNavContent("saved-course");
      }
    }
  } else {
    handleNavContent(page);
  }
};

const handleNavContent = (menu = "home") => {
  let tabName = menu;
  const target = document.getElementById(tabName);
  if (!target) {
    return false;
  }
  const navTabContent = target.closest(".tab-content");
  const tabContentList = navTabContent.querySelectorAll(".tab-pane");
  tabContentList.forEach((element) => {
    element.classList.remove("show");
    element.classList.remove("active");
  });
  const mainNav = document.querySelectorAll("#nav-tab a");
  if (mainNav) {
    let menus = [];
    mainNav.forEach((element) => {
      menus.push(element.getAttribute("aria-controls"));
    });
    if (menus.includes(tabName) && location.hash) {
      tabName = location.hash.replace("#", "");
    }
  }
  tabContentList.forEach((element) => {
    if (element.id === tabName) {
      element.classList.add("show");
      element.classList.add("active");
    }
  });
  navTabContent.scrollTop = 0;
};

const initMenuColor = (target, list) => {
  list.forEach((element) => {
    if (target === element) {
      if (element.classList.contains("text-secondary")) {
        element.classList.remove("text-secondary");
        element.classList.add("text-dark");
        element.setAttribute("aria-selected", true);
      }
    } else {
      if (!element.classList.contains("text-secondary")) {
        element.classList.remove("text-dark");
        element.classList.add("text-secondary");
        element.setAttribute("aria-selected", false);
      }
    }
  });
};

const handleNavUrl = (event, list, type = null) => {
  event.preventDefault();
  const target = event.currentTarget;
  const prevUrl = getUrl();
  //let url = prevUrl.replace(location.search, "");
  let url = prevUrl;
  let newUrl;
  if (type === "change") {
    const hash = target.hash;
    newUrl = hash === "#home" ? url.split("#")[0] : url.split("#")[0] + hash;
    location.href = newUrl;
    if (hash !== "#home") {
      handlePageInit();
    }
  } else {
    const menu = target.getAttribute("aria-controls");
    newUrl = url;
    history.pushState(null, null, newUrl);
    handlePageInit(menu);
  }
  initMenuColor(target, list);
};

const postData = async (url = "", data = {}) => {
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE 등
    mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
  });
  return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
};
