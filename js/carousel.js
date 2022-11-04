(function () {
  const myCarousel = document.querySelector("#myCarousel");
  if (myCarousel) {
    const mainCarousel = new bootstrap.Carousel(myCarousel, {
      interval: 2000,
      ride: "carousel",
    });
  }

  const slideLeftBtn = document.querySelectorAll(".custom-control-prev");
  const slideRightBtn = document.querySelectorAll(".custom-control-next");

  const hashtagsScroll = (event, direction) => {
    event.preventDefault();
    const content = event.currentTarget.parentNode;
    if (direction === "left") {
      content.scrollLeft -= 500;
    } else {
      console.log(content.scrollLeft);
      content.scrollLeft += 500;
    }
    console.log(direction, content, content.scrollLeft);
  };

  if (slideLeftBtn.length > 0) {
    slideLeftBtn.forEach((element) => {
      element.addEventListener("click", (event) => {
        hashtagsScroll(event, "left");
      });
    });
  }

  if (slideRightBtn.length > 0) {
    slideRightBtn.forEach((element) => {
      element.addEventListener("click", (event) => {
        hashtagsScroll(event, "right");
      });
    });
  }
})();
