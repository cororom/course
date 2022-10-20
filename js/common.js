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

const handleNavContent = (menu = "home") => {
  let tabName = menu;
  const navTabContent = document.getElementById(tabName).closest(".tab-content");
  const tabContentList = navTabContent.querySelectorAll(".tab-pane");
  tabContentList.forEach((element) => {
    element.classList.remove("show");
    element.classList.remove("active");
  });
  if (location.hash) {
    tabName = location.hash.replace("#", "");
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
      if (target.classList.contains("text-secondary")) {
        target.classList.remove("text-secondary");
        target.classList.add("text-dark");
      }
    } else {
      if (!element.classList.contains("text-secondary")) {
        element.classList.remove("text-dark");
        element.classList.add("text-secondary");
      }
    }
  });
};

const handleNavUrl = (event, list, type = null) => {
  event.preventDefault();
  const target = event.currentTarget;
  const prevUrl = getUrl();
  let url = prevUrl.replace(location.search, "");
  let newUrl;
  const menu = target.getAttribute("aria-controls");
  if (type === "change") {
    const hash = target.hash;
    if (hash == "#home") {
      newUrl = url.split("#")[0];
    } else {
      newUrl = url.split("#")[0] + hash;
    }
  } else {
    newUrl = url;
  }
  history.pushState(null, null, newUrl);
  initMenuColor(target, list);
  handleNavContent(menu);
  if (menu === "home") {
    handleNavContent("video");
  }
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

const getPage = async (url = "") => {
  const response = await fetch(url, {
    method: "GET",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.text();
};

const isNodeScript = (node) => {
  return node.tagName === "SCRIPT";
};

const cloneNodeScript = (node) => {
  const script = document.createElement("script");
  script.text = node.innerHTML;

  let i = -1,
    attrs = node.attributes,
    attr;
  while (++i < attrs.length) {
    script.setAttribute((attr = attrs[i]).name, attr.value);
  }
  return script;
};

const replaceNodeScript = (node) => {
  if (isNodeScript(node) === true) {
    const clone = cloneNodeScript(node);
    //node.parentNode.replaceChild(cloneNodeScript(node), node);
    const nodeParent = node.parentNode;
    nodeParent.remove(node);
    nodeParent.add(clone);
  } else {
    var i = -1,
      children = node.childNodes;
    while (++i < children.length) {
      replaceNodeScript(children[i]);
    }
  }
  return node;
};
