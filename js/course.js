(function () {
  const scrollSpy = new bootstrap.ScrollSpy(document.querySelector(".course-detail"), {
    target: "#course-menu",
  });

  const courseBack = document.querySelector(".course-back");

  const handleCourseBack = (event) => {
    event.preventDefault();
    const url = parseUrl(location.href);
    let pathQuery = url.pathname.split("/");
    pathQuery.pop();
    pathQuery.push("index.html");
    url.pathname = pathQuery.join("/");
    const newUrl = `${url.origin}${url.pathname}#lecture`;
    location.href = newUrl;
  };

  if (courseBack) {
    courseBack.addEventListener("click", handleCourseBack);
  }

  const questionMove = document.querySelector(".question-move");

  const handleQuestionMove = (event) => {
    event.preventDefault();
    const url = parseUrl(location.href);
    let pathQuery = url.pathname.split("/");
    pathQuery.pop();
    pathQuery.push("question.html");
    url.pathname = pathQuery.join("/");
    const params = url.searchParams;
    const newUrl = `${url.origin}${url.pathname}?course=${params.get("no")}#question-write`;
    location.href = newUrl;
  };

  if (questionMove) {
    questionMove.addEventListener("click", handleQuestionMove);
  }
})();
