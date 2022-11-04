(function () {
  const questionBack = document.querySelector(".question-back");

  const handleQuestionBack = (event) => {
    event.preventDefault();
    const url = parseUrl(location.href);
    let pathQuery = url.pathname.split("/");
    pathQuery.pop();
    pathQuery.push("course.html");
    url.pathname = pathQuery.join("/");
    const params = url.searchParams;
    const newUrl = `${url.origin}${url.pathname}?no=${params.get("course")}`;
    location.href = newUrl;
  };

  if (questionBack) {
    questionBack.addEventListener("click", handleQuestionBack);
  }
})();
