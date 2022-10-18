(function () {
  const header = document.querySelector(".main-header");
  const headerHeight = header.clientHeight;
  const stickyMenu = document.querySelector(".sticky-menu");
  const menuTop = stickyMenu.offsetTop;

  const handleNavFix = () => {
    if (window.pageYOffset < menuTop - headerHeight) {
      stickyMenu.classList.remove("sticky-top");
      stickyMenu.removeAttribute("style");
    } else {
      stickyMenu.classList.add("sticky-top");
      stickyMenu.setAttribute("style", `top:${window.pageYOffset}px !important;`);
    }
  };

  window.addEventListener("scroll", handleNavFix);
})();
