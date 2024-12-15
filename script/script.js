var video = document.getElementById("myVideo");
video.playbackRate = 0.6;

var bgvideo = document.getElementById("background-video");
bgvideo.playbackRate = 0.5;

const polaroids = document.querySelectorAll(".polaroid");
let currentIndex = 0;

// polaroiddd
function showNextPolaroid() {
  const totalPolaroids = polaroids.length;

  polaroids.forEach((p) => p.classList.add("hidden"));

  currentIndex = (currentIndex + 1) % totalPolaroids;
  const prevIndex = (currentIndex - 1 + totalPolaroids) % totalPolaroids;
  const nextIndex = (currentIndex + 1) % totalPolaroids;

  polaroids[currentIndex].classList.remove("hidden");
  polaroids[currentIndex].classList.add("visible");
  polaroids[prevIndex].classList.add("hidden", "left");
  polaroids[nextIndex].classList.add("hidden", "right");
}

// LocomotiveScroll
setInterval(showNextPolaroid, 4000);

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// --
// GSAP animation function with smooth scrolling numbers without decimals
function animateNumber(startNumber, endNumber) {
  // Set the starting number on the element
  document.querySelector("#numberDisplay").innerHTML = startNumber;

  // GSAP animation
  gsap.to("#numberDisplay", {
    innerHTML: endNumber, // Final number (change to any value you want)
    duration: 3, // Duration of the animation
    snap: { innerHTML: 1 }, // Ensures smooth transitions between whole numbers
    ease: "power2.out", // Easing function
    onUpdate: function () {
      // Ensure that the numbers are whole (no decimal points)
      let number = Math.floor(this.targets()[0].innerHTML);
      document.querySelector("#numberDisplay").innerHTML = number; // Update with whole numbers
    },
    onComplete: function () {
      // Ensure final number is the desired whole number after the animation ends
      document.querySelector("#numberDisplay").innerHTML = endNumber;
    },
  });
}

// Intersection Observer to trigger the animation on entering the viewport
let observer = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumber(90, 100); // Call the function with custom start (0) and end (2) numbers
        observer.unobserve(entry.target); // Optionally stop observing after the animation is triggered
      }
    });
  },
  { threshold: 0.5 } // Adjust this value to determine when the animation should trigger
);

// Observe the #page4 section
observer.observe(document.querySelector("#page4"));

function toggleMenu() {
  const rightNav = document.getElementById('right-nav');
  rightNav.classList.toggle('active');
}



init();
animate();