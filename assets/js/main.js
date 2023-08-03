swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    200: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});

$(document).ready(function () {
  $(".show-content-btn").click(function () {
    const th = $(this);
    const contentId = $(this).data("content");

    if (!th.hasClass("active")) {
      $(".show-content-btn").removeClass("active");
      th.addClass("active");
    }

    $("#" + contentId)
      .show()
      .siblings()
      .hide();
  });
});

$(document).ready(function () {
  $(".dropdown-header").on("click", function () {
    const targetId = $(this).data("target");
    const targetMenu = $("#" + targetId);
    // const menus = $(".dropdown-menu").not(targetMenu);
    const windowWidth = window.innerWidth;

    if (windowWidth <= 768) {
      $(this).stop(true).toggleClass("show");
      targetMenu.stop(true).slideToggle();
    }

    //   targetMenu.toggleClass("show");
  });

  $(window).resize(function () {
    const windowWidth = window.innerWidth;
    const menus = $(".dropdown-menu");
    const header = $(".dropdown-header");

    if (windowWidth >= 769) {
      menus.removeAttr("style");
      header.removeClass("show");
    }
  });

  // Закрийте меню, якщо користувач клікне поза нього, лише на екранах з шириною менше 768px
  $(document).on("click", function (event) {
    if ($(window).width() < 768) {
      const targetElement = event.target;
      const headers = $(".dropdown-header");
      const menus = $(".dropdown-menu");

      menus.each(function () {
        const menu = $(this);
        if (!menu.is(targetElement) && !headers.is(targetElement)) {
          menu.slideUp();
          headers.removeClass("show");
        }
      });
    }
  });
});
