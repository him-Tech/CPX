$(document).ready(function () {
  // swiper data
  const data = [
    {
      id: 0,
      clientImg: "./assets/img/testimonial.png",
      clientTestimonial:
        "Participating in a mission with La Guilde was a transformative experience. I learned as much about myself as I did about others and made incredible connections.",
      clientStars: 4,
    },
    {
      id: 1,
      clientImg: "./assets/img/testimonial.png",
      clientTestimonial:
        "Participating in a mission with La Guilde was a transformative experience. I learned as much about myself as I did about others and made incredible connections.",
      clientStars: 5,
    },
    {
      id: 2,
      clientImg: "./assets/img/testimonial.png",
      clientTestimonial:
        "Participating in a mission with La Guilde was a transformative experience. I learned as much about myself as I did about others and made incredible connections.",
      clientStars: 3,
    },
    {
      id: 3,
      clientImg: "./assets/img/testimonial.png",
      clientTestimonial:
        "Participating in a mission with La Guilde was a transformative experience. I learned as much about myself as I did about others and made incredible connections.",
      clientStars: 3,
    },
    {
      id: 4,
      clientImg: "./assets/img/testimonial.png",
      clientTestimonial:
        "Participating in a mission with La Guilde was a transformative experience. I learned as much about myself as I did about others and made incredible connections.",
      clientStars: 5,
    },
  ];

  // Star SVG
  const starSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_1_614)">
    <path d="M8.24301 7.34004L1.86301 8.26505L1.75001 8.28804C1.57895 8.33346 1.423 8.42345 1.2981 8.54885C1.1732 8.67424 1.08381 8.83053 1.03907 9.00177C0.994331 9.17301 0.995837 9.35305 1.04344 9.52352C1.09104 9.69398 1.18303 9.84876 1.31001 9.97204L5.93201 14.471L4.84201 20.826L4.82901 20.936C4.81854 21.113 4.85527 21.2895 4.93546 21.4475C5.01564 21.6056 5.13639 21.7395 5.28534 21.8356C5.4343 21.9316 5.6061 21.9863 5.78316 21.9942C5.96022 22.002 6.13617 21.9626 6.29301 21.88L11.999 18.88L17.692 21.88L17.792 21.926C17.9571 21.9911 18.1365 22.011 18.3118 21.9838C18.4871 21.9566 18.652 21.8833 18.7896 21.7713C18.9272 21.6593 19.0326 21.5128 19.0948 21.3467C19.1571 21.1806 19.1741 21.0009 19.144 20.826L18.053 14.471L22.677 9.97104L22.755 9.88604C22.8664 9.74881 22.9395 9.5845 22.9667 9.40984C22.994 9.23518 22.9744 9.05642 22.9101 8.89178C22.8458 8.72713 22.7389 8.58248 22.6005 8.47256C22.462 8.36264 22.2969 8.29138 22.122 8.26604L15.742 7.34004L12.89 1.56004C12.8075 1.39258 12.6797 1.25156 12.5212 1.15295C12.3627 1.05434 12.1797 1.00208 11.993 1.00208C11.8063 1.00208 11.6233 1.05434 11.4648 1.15295C11.3063 1.25156 11.1785 1.39258 11.096 1.56004L8.24301 7.34004Z" fill="#F59E0B"/>
  </g>
  <defs>
    <clipPath id="clip0_1_614">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

  // To create a swiper card
  function createTestimonialCard(item) {
    const stars = Array(item.clientStars).fill(starSVG).join("");

    return $(`
    <div
            class="swiper-slide bg-[#FAFAFA] text-black h-[351px] flex flex-col items-center justify-end p-[14px_29px_28px] rounded-2xl sm:rounded-[21px]"
          >
            <!-- Navigation buttons -->
            <div
              class="swiper-btn-ctr w-full px-[14px] pt-[14px] absolute top-0 left-0 hidden"
            >
              <div class="w-full flex items-center justify-between gap-3">
                <!-- Prev btn -->
                <div
                  class="swiper-btn-prev size-9 sm:size-[50px] rounded-[50px] flex-shrink-0 bg-white flex items-center justify-center hover:scale-90 duration-300 ease-linear"
                >
                  <img
                    src="./assets/svg/swiper-prev.svg"
                    alt="prev"
                    class="size-[21px]"
                  />
                </div>
                <!-- Next btn -->
                <div
                  class="swiper-btn-next size-9 sm:size-[50px] rounded-[50px] flex-shrink-0 bg-white flex items-center justify-center hover:scale-90 duration-300 ease-linear"
                >
                  <img
                    src="./assets/svg/swiper-next.svg"
                    alt="prev"
                    class="size-[21px]"
                  />
                </div>
              </div>
            </div>
            <!-- Image -->
            <div class="size-[88px] rounded-[88px]">
              <img
                src=${item.clientImg}
                alt="testimonial client avatar"
                class="w-full h-full object-contain"
              />
            </div>
            <!-- Test -->
            <p
              class="mt-[15px] text-center text-lg font-medium leading-[26px] line-clamp-3"
            >
              ${item.clientTestimonial}
            </p>
            <!-- Rating -->
            <div
              class="mt-10 w-full flex items-center justify-center gap-[7px]"
            >${stars}</div>
          </div>
    `);
  }

  // Swiper container
  const $swiperContainer = $("#swiper-ctr");

  // Appending elements
  data.forEach((item) => {
    const $component = createTestimonialCard(item);
    $swiperContainer.append($component);
  });

  // Testimonial Swiper
  const swiper = new Swiper(".testimonialSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev",
    },
    on: {
      init: function () {
        updateNavigationButtons(this);
      },
      slideChange: function () {
        updateNavigationButtons(this);
      },
    },
    breakpoints: {
      640: {
        slidesPerView: 1.3,
      },
      768: {
        slidesPerView: 1.5,
      },
      1024: {
        slidesPerView: 2.5,
      },
    },
  });

  function updateNavigationButtons(swiper) {
    const slides = document.querySelectorAll(
      ".testimonialSwiper .swiper-slide"
    );
    slides.forEach((slide, index) => {
      const btnCtr = slide.querySelector(".swiper-btn-ctr");
      if (btnCtr) {
        if (swiper.activeIndex === index) {
          btnCtr.classList.remove("hidden");
          btnCtr.classList.add("block");
        } else {
          btnCtr.classList.add("hidden");
          btnCtr.classList.remove("block");
        }
      }
    });
  }
});
