(function () {
  const relatedMenu = document.querySelectorAll(".related-menu a[data-toggle='tab']");

  const handleRelatedContent = (event, list) => {
    event.preventDefault();
    handleNavUrl(event, list);
  };

  if (relatedMenu.length > 0) {
    relatedMenu.forEach((element) => {
      element.addEventListener("click", (event) => {
        handleRelatedContent(event, relatedMenu);
      });
    });
  }
})();
