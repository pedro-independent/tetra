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

/* Links Hover */

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

// gsap.to("[kpi-zoom]", {
//   scrollTrigger: {
//     trigger: ".kpi-container",
//     start: "top top",
//     end: "bottom top",
//     pin: true,
//     onComplete: () => ScrollTrigger.refresh(),
//     markers: true,
//   },
//   scale: 4,
// });