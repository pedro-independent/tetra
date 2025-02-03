/* GO BACK TO TOP ON REFRESH */
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };


/* Buttons Hover*/

function initButtonCharacterStagger() {
  const offsetIncrement = 0.01; // Transition offset increment in seconds
  const buttons = document.querySelectorAll('[data-button-animate-chars]');

  buttons.forEach(button => {
    const text = button.textContent; // Get the button's text content
    button.innerHTML = ''; // Clear the original content

    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.transitionDelay = `${index * offsetIncrement}s`;

      // Handle spaces explicitly
      if (char === ' ') {
        span.style.whiteSpace = 'pre'; // Preserve space width
      }

      button.appendChild(span);
    });
  });
}

initButtonCharacterStagger();

/* Links Underline Hover */

// ———— animation
// const hoverLinks = document.querySelectorAll("[hover-link]");
// hoverLinks.forEach((link) => {
//   const letters = link.querySelectorAll("[hover-link-text] .char");
//   link.addEventListener("mouseenter", function () {
//     gsap.to(letters, {
//       yPercent: -100,
//       duration: 0.5,
//       ease: "power3.out",
//       stagger: { each: 0.03, from: "start" },
//       overwrite: true
//     });
//   });
//   link.addEventListener("mouseleave", function () {
//     gsap.to(letters, {
//       yPercent: 0,
//       duration: 0.5,
//       ease: "power3.out",
//       stagger: { each: 0.03, from: "start" },
//     });
//   });
// });

/* Flip */

// SCROLL FLIP POWER-UP
  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }
  gsap.registerPlugin(ScrollTrigger, Flip);
  ScrollTrigger.normalizeScroll(true);
  // scrollflip component
  $("[tr-scrollflip-element='component']").each(function (index) {
    let componentEl = $(this),
      originEl = componentEl.find("[tr-scrollflip-element='origin']"),
      targetEl = componentEl.find("[tr-scrollflip-element='target']"),
      scrubStartEl = componentEl.find("[tr-scrollflip-scrubstart]"),
      scrubEndEl = componentEl.find("[tr-scrollflip-scrubend]");
    let startSetting = attr("top top", scrubStartEl.attr("tr-scrollflip-scrubstart")),
      endSetting = attr("bottom bottom", scrubEndEl.attr("tr-scrollflip-scrubend")),
      staggerSpeedSetting = attr(0, componentEl.attr("tr-scrollflip-staggerspeed")),
      staggerDirectionSetting = attr("start", componentEl.attr("tr-scrollflip-staggerdirection")),
      scaleSetting = attr(false, componentEl.attr("tr-scrollflip-scale")),
      breakpointSetting = attr(0, componentEl.attr("tr-scrollflip-breakpoint"));
    let componentIndex = index,
      timeline,
      resizeTimer;
    // asign matching data flip ids
    originEl.each(function (index) {
      let flipId = `${componentIndex}-${index}`;
      $(this).attr("data-flip-id", flipId);
      targetEl.eq(index).attr("data-flip-id", flipId);
    });
    // create timeline
    function createTimeline() {
      if (timeline) {
        timeline.kill();
        gsap.set(targetEl, { clearProps: "all" });
      }
      $("body").addClass("scrollflip-relative");
      gsap.matchMedia().add(`(min-width: ${breakpointSetting}px)`, () => {
        const state = Flip.getState(originEl);
        timeline = gsap.timeline({scrollTrigger: { trigger: scrubStartEl, endTrigger: scrubEndEl, start: startSetting, end: endSetting, scrub: true }});
        timeline.add(Flip.from(state, { targets: targetEl, scale: scaleSetting, stagger: { amount: staggerSpeedSetting, from: staggerDirectionSetting }}));
      });
      $("body").removeClass("scrollflip-relative");
    }
    createTimeline();
    // update on window resize
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        createTimeline();
      }, 250);
    });

  });

/* Scroll zoom kpi into section */

  // Select the section containing the numbers
  let numberSection = document.querySelector(".kpi-section");

  // Create GSAP animation
  gsap.timeline({
    scrollTrigger: {
      trigger: numberSection,
      start: "center top", // When the section reaches the top
      end: "+=250%", // Duration of the effect
      scrub: 1, // Smooth animation while scrolling
      pin: true, // Keeps the section fixed during the animation
      //pinSpacing: false, // Prevent extra white space
      //markers: true
    }
  })
  .to(".kpi-number", {
    scale: 250, // Zoom into numbers (adjust as needed)
    duration: 3,
    ease: "power1.in",
    transformOrigin: "40% 70%"
  });

  gsap.set(".about-cover", {opacity: 1});
  gsap.timeline({
    scrollTrigger: {
      trigger: ".section_about",
      start: "top top",
      end: "+=100%", // Adjust scroll duration
      scrub: 1, // Smooth animation
      pin: true, // Keep section fixed during scroll
    }
  })
  .to(".about-cover", {
    opacity: 0,
    duration: 1,
    ease: "none"
  });
  

/* KPI counter up */




/* General Parallax */
document.querySelectorAll("[parallax-container]").forEach((container) => {
  const image = container.querySelector("[parallax-img]");
  
  if (image) {
    const isHorizontal = container.getAttribute("parallax-container") === "horizontal";

    if (isHorizontal) {
      // Horizontal Parallax Effect
      const containerWidth = container.offsetWidth;
      const imageWidth = image.offsetWidth;
      const widthDifference = imageWidth - containerWidth;

      gsap.to(image, {
        x: -widthDifference, // Moves the image horizontally
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    } else {
      // Vertical Parallax Effect (Default)
      const containerHeight = container.offsetHeight;
      const imageHeight = image.offsetHeight;
      const heightDifference = imageHeight - containerHeight;

      gsap.to(image, {
        y: -heightDifference, // Moves the image vertically
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }
});


/* Values Parallax with Manual Speed Control */

const getSpeed = (element) => {
  // Get speed from data-scroll-speed attribute, default to -100 if not set
  return parseFloat(element.getAttribute("scroll-speed")) || -100;
};

document.querySelectorAll(".values-img-wrap").forEach((image) => {
  gsap.to(image, {
    y: getSpeed(image),
    ease: "none",
    scrollTrigger: {
      trigger: image,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
    },
    onComplete: () => ScrollTrigger.refresh(),
  });
});

/* Horizontal Scroll */


const hWrap = document.querySelector(".hscroll-wrap")
const hSection = gsap.utils.toArray(".hscroll-section")

let scrollTween = gsap.to(hSection, {
  xPercent: -100 * (hSection.length - 1),
  ease: "none",
  scrollTrigger:{
  trigger: ".hscroll-wrap",
  pin: true,
  scrub: 1,
  end: "+=3000" 
  }
});

/* Program Scroll Animation */

gsap.set(".program-item-sub-wrap", {
  height: 0,
  opacity: 0,
  margin: 0,
});

let homeValues = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_program",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true,
    //markers: true,
  },
});

const items = document.querySelectorAll(".program-item-wrap");
const subItems = document.querySelectorAll(".program-item-sub-wrap");
const headers = document.querySelectorAll(".program-h3");

items.forEach((item, index) => {
  // Close the previous sub-wrap and reset its color
  if (index > 0) {
    homeValues.to(
      subItems[index - 1],
      {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      ">"
    ); // Starts when the next one begins opening
  }

  // Open the current sub-wrap
  homeValues.to(
    subItems[index],
    {
      height: "auto",
      opacity: 1,
      marginTop: "2em",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => ScrollTrigger.refresh(),
    },
    "<"
  ); // Overlaps with the closing animation of the previous sub-wrap
});