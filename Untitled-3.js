document.addEventListener("DOMContentLoaded", function() {
   const divider = document.querySelector(".scroll-divider");

   function checkVisibility() {
      const rect = divider.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
         divider.classList.add("visible"); // Add class when in view
      }
   }

   window.addEventListener("scroll", checkVisibility);
   checkVisibility(); // Run on load to check if already visible
});
