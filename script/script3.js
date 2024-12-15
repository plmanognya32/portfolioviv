$(document).ready(function () {
  // Smooth scrolling
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") ||
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000
        );
        return false;
      }
    }
  });

  // Update active state on scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav li");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove 'active' class from all nav items
        navItems.forEach((item) => item.classList.remove("active"));
        // Add 'active' class to current nav item
        const activeNav = document.querySelector(
          `.nav li a[href="#${entry.target.id}"]`
        ).parentElement;
        activeNav.classList.add("active");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
});
