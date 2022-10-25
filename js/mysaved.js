(function () {
  const contentType = document.querySelectorAll(".content-type a[data-toggle='tab']");

  const handleSavedContent = (event, list) => {
    event.preventDefault();
    handleNavUrl(event, list);
    initMenuColor(event.currentTarget, list);
  };

  if (contentType.length > 0) {
    contentType.forEach((element) => {
      element.addEventListener("click", (event) => {
        handleSavedContent(event, contentType);
      });
    });
  }

  const savedMenu = document.querySelectorAll(".saved-menu a[data-toggle='tab']");

  if (savedMenu.length > 0) {
    savedMenu.forEach((element) => {
      element.addEventListener("click", (event) => {
        handleSavedContent(event, savedMenu);
      });
    });
  }
})();
