$(document).ready(function () {
  // animation for numbers start
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
  // animation for numbers end

  // for sidebar
  let bodyy = document.getElementById("body");
  let cancel = document.getElementById("cancel");
  let btn = document.getElementById("navbtn");
  let sidebar = document.getElementById("sidebarbtn");
  let navLinks = document.querySelectorAll(".nav-link");

  btn.addEventListener("click", () => {
    sidebar.style.left = "0";
    bodyy.style.overflow = "hidden";
  });
  cancel.addEventListener("click", () => {
    sidebar.style.left = "-105%";
    bodyy.style.overflow = "auto";
  });
  navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", function () {
      sidebar.style.left = "-105%";
      bodyy.style.overflow = "auto";
    });
  });

  document.addEventListener("click", (event) => {
    const dropdownMenu = document.getElementById("languageDropdown");
    const isDropdownButton = event.target.closest("#languageDropdownButton");

    if (isDropdownButton) {
      dropdownMenu.classList.toggle("hidden");
    } else if (!event.target.closest("#languageDropdown")) {
      dropdownMenu.classList.add("hidden");
    }

    if (event.target.closest("#languageDropdown a")) {
      event.preventDefault();
      document.getElementById("languageText").textContent =
        event.target.getAttribute("data-value");
      dropdownMenu.classList.add("hidden");
    }
  });

  document.addEventListener("click", (event) => {
    const sidebarDropdownMenu = document.getElementById(
      "sidebarLanguageDropdown"
    );
    const isSidebarDropdownButton = event.target.closest(
      "#sidebarLanguageDropdownButton"
    );

    if (isSidebarDropdownButton) {
      sidebarDropdownMenu.classList.toggle("hidden");
    } else if (!event.target.closest("#sidebarLanguageDropdown")) {
      sidebarDropdownMenu.classList.add("hidden");
    }

    if (event.target.closest("#sidebarLanguageDropdown a")) {
      event.preventDefault();
      document.getElementById("sidebarLanguageText").textContent =
        event.target.getAttribute("data-value");
      sidebarDropdownMenu.classList.add("hidden");
    }
  });
});
