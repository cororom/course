(function () {
  const replyBtn = document.querySelectorAll(".comment-reply-btn");

  const getCommentNo = (target) => {
    return target.closest(".comment-row").getAttribute("data-value");
  };

  const replyInit = () => {
    const replySubmit = document.querySelectorAll(".comment-reply-submit");
    if (replySubmit.length > 0) {
      replySubmit.forEach((element) => {
        element.addEventListener("click", handleReply);
      });
    }
  };

  const createReply = (event) => {
    event.preventDefault();
    const commentNo = getCommentNo(event.currentTarget);
    const root = document.querySelector(`.comment-row[data-value="${commentNo}"] .comment-info`);
    if (root.querySelector(".comment-reply-hidden")) {
      return false;
    }
    const replySection = document.createElement("div");
    replySection.className = "comment-reply-hidden w-100 border-bottom";
    const replyInput = document.createElement("input");
    replyInput.className = "border-0";
    replyInput.type = "text";
    replyInput.name = "comment-reply";
    const replySubmit = document.createElement("div");
    replySubmit.className = "comment-reply-submit";
    replySubmit.textContent = "등록";
    replySection.appendChild(replyInput);
    replySection.appendChild(replySubmit);
    root.appendChild(replySection);
    replyInput.focus();
    replyInit();
  };

  const handleReply = async (event) => {
    event.preventDefault();
    const commentNo = getCommentNo(event.currentTarget);
    await postData("commentEtc.php", {
      commentNo,
      type: "commentReply",
    }).then((data) => {
      console.log(data);
    });
  };

  if (replyBtn.length > 0) {
    replyBtn.forEach((element) => {
      element.addEventListener("click", createReply);
    });
  }

  const commentEtc = document.querySelectorAll(".comment-etc");
  const reportBtn = document.querySelector(".comment-report");
  const blockBtn = document.querySelector(".comment-block");

  const handleCommentEtc = (event) => {
    event.preventDefault();
    const commentNo = getCommentNo(event.currentTarget);
    const menu = document.querySelector(".comment-etc-menu");
    if (menu.classList.contains("d-none")) {
      reportBtn.setAttribute("data-value", commentNo);
      blockBtn.setAttribute("data-value", commentNo);
    } else {
      reportBtn.removeAttribute("data-value");
      blockBtn.removeAttribute("data-value");
    }
    menu.classList.toggle("d-none");
  };

  const handleEtcRequest = async (event) => {
    event.preventDefault();
    const target = event.target;
    const commentNo = target.getAttribute("data-value");
    const requestType = target.getAttribute("data-target");
    await postData("commentEtc.php", {
      commentNo,
      type: requestType,
    }).then((data) => {
      console.log(data);
    });
  };

  if (commentEtc.length > 0) {
    commentEtc.forEach((element) => {
      element.addEventListener("click", handleCommentEtc);
    });
  }

  if (reportBtn) {
    reportBtn.addEventListener("click", handleEtcRequest);
  }

  if (blockBtn) {
    blockBtn.addEventListener("click", handleEtcRequest);
  }
})();
