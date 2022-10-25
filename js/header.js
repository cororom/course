(function () {
  const container = document.querySelector("#nav-tabContent");
  const header = document.querySelector(".main-header");
  const headerHeight = header.clientHeight;
  const stickyMenu = document.querySelector(".sticky-menu");
  const menuTop = stickyMenu.offsetTop;

  const handleNavFix = () => {
    if (container.pageYOffset < menuTop - headerHeight) {
      stickyMenu.classList.remove("sticky-top");
      stickyMenu.removeAttribute("style");
    } else {
      stickyMenu.classList.add("sticky-top");
      stickyMenu.setAttribute("style", `top:${container.pageYOffset}px !important;`);
    }
  };

  container.addEventListener("scroll", handleNavFix);
})();
