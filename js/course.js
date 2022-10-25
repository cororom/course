(function () {
  const courseMenu = document.querySelectorAll(".course-menu .nav-link");

  const handleCourseMenu = (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    console.log(target);
  };

  //   if (courseMenu.length > 0) {
  //     courseMenu.forEach((element) => {
  //       element.addEventListener("click", handleCourseMenu);
  //     });
  //   }

  const scrollSpy = new bootstrap.ScrollSpy(document.querySelector(".course-detail"), {
    target: "#course-menu",
  });

  console.log(scrollSpy);
})();
