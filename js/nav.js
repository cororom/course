(function () {
  const tabs = document.querySelectorAll("header a[data-toggle='tab']");

  handleNavContent("home");
  handleNavContent("video");

  if (tabs) {
    tabs.forEach((element) => {
      element.addEventListener("click", (event) => {
        handleNavUrl(event, tabs, "change");
      });
    });
  }

  const menus = document.querySelectorAll(".sticky-menu a[data-toggle='tab']");

  menus.forEach((element) => {
    element.addEventListener("click", (event) => {
      handleNavUrl(event, menus);
      initMenuColor(event.currentTarget, menus);
    });
  });
})();
