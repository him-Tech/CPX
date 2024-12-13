$(document).ready(function () {
  // Animation for numbers start
  gsap.registerPlugin(ScrollTrigger);

  let stats = $(".statsBannerCard__statistic").toArray();

  function countOne(stat) {
    $(stat).css({
      visibility: "visible",
    });

    let count = $(stat),
      zero = {
        val: 0,
      },
      num = count.data("number"),
      split = (num + "").split("."), // to cover for instances of decimals
      decimals = split.length > 1 ? split[1].length : 0;

    if (typeof num == "number") {
      gsap.to(zero, {
        val: num,
        duration: 2,
        scrollTrigger: {
          trigger: stat,
          start: "top 92%",
          onEnter: function () {
            gsap.to(zero, {
              val: num,
              duration: 2,
              onUpdate: function () {
                let numText = zero.val.toFixed(decimals);
                numText = numText.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                count.text(numText);
              },
            });
          },
        },
      });
    } else {
      count.text(num);
    }
  }

  // Iterate through all stats and initiate the count animation
  stats.forEach((stat) => {
    countOne(stat);
  });
  // Animation for numbers end

  // Handle sidebar start
  let bodyy = document.getElementById("body");
  let cancel = document.getElementById("cancel");
  let btn = document.getElementById("navbtn");
  let sidebar = document.getElementById("sidebarbtn");
  let navLinks = document.querySelectorAll(".nav-link");
  let sidebarOverlay = document.getElementById("sidebar-overlay");

  const handleSidebar = () => {
    sidebar.style.left = "-105%";
    bodyy.style.overflow = "auto";
    sidebarOverlay.style.display = "none";
  };

  btn.addEventListener("click", () => {
    sidebar.style.left = "0";
    bodyy.style.overflow = "hidden";
    sidebarOverlay.style.display = "block";
  });
  cancel.addEventListener("click", handleSidebar);
  sidebarOverlay.addEventListener("click", handleSidebar);
  navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", handleSidebar);
  });
  // Handle sidebar end

  // Language dropdown start

  // Sidebar language dropdown start

  // To scroll window to top
  let scrollToTopBtn = document.getElementById("scrollToTop");
  scrollToTopBtn.addEventListener("click", () => {
    const heroSection = document.getElementById("hero");
    heroSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });

  // To show scroll window to top button after user scroll down
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollToTopBtn.classList.remove("hidden");
    } else {
      scrollToTopBtn.classList.add("hidden");
    }
  });
});
