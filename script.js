/* GO BACK TO TOP ON REFRESH */
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const page = document.body.dataset.page;

/* Buttons Hover*/

function initButtonCharacterStagger() {
  const offsetIncrement = 0.01; // Transition offset increment in seconds
  const buttons = document.querySelectorAll("[data-button-animate-chars]");

  buttons.forEach((button) => {
    const text = button.textContent; // Get the button's text content
    button.innerHTML = ""; // Clear the original content

    [...text].forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.transitionDelay = `${index * offsetIncrement}s`;

      // Handle spaces explicitly
      if (char === " ") {
        span.style.whiteSpace = "pre"; // Preserve space width
      }

      button.appendChild(span);
    });
  });
}

initButtonCharacterStagger();

/* Menu Color Change On Scroll */

// const navMenu = document.querySelector(".navbar-container");
// const darkSections = document.querySelectorAll("[dark-section]");

// darkSections.forEach((section) => {
//   gsap.to(navMenu, {
//     color: "#ffffff",
//     scrollTrigger: {
//       trigger: section,
//       start: "top top",
//       end: "90% top",
//       toggleActions: "play none reverse none",
//       markers: true,
//     }
//   });
// });

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

if (page === "home") {
  function initLoader() {
    var loading = gsap.timeline();
    gsap.defaults({
      ease: "Expo.easeInOut",
      duration: 1.2,
    });

    let splitH1 = new SplitType("h1", { types: "lines" });
    let splitLoadText = new SplitType(".hero-p", { types: "lines" });

    loading.set(".loading-screen", {
      //display: "block",
    });

    gsap.set(splitH1.lines, {
      yPercent: 100,
      opacity: 0,
    });

    gsap.set(splitLoadText.lines, {
      yPercent: 100,
      opacity: 0,
    });

    gsap.set("#hero-btn", {
      yPercent: 100,
      opacity: 0,
    })

    loading.to(
      ".loading-screen",
      {
        yPercent: "-100",
        delay: 0.75,
      },
      "<"
    );

    loading.to(
      splitH1.lines,
      {
        yPercent: 0,
        opacity: 1,
        delay: 1,
        stagger: 0.2,
        ease: "power2.out",
      },
      "<"
    );

    loading.to(
      splitLoadText.lines,
      {
        yPercent: 0,
        opacity: 1,
        delay: 0.5,
        stagger: 0.2,
        ease: "power2.out",
      },
      "<"
    );

    loading.to(
      "#hero-btn",
      {
        yPercent: 0,
        opacity: 1,
        delay: 0.5,
        stagger: 0.2,
        ease: "power2.out",
      },
      "<"
    );
  }

  /* Init Loading Function */
  initLoader();

  /* Flip */
  gsap.registerPlugin(Flip, ScrollTrigger);

  const holders = document.querySelectorAll(".shortage-img-wrap");
  const containerHolder = document.querySelector(
    ".shortage-img-container-holder"
  );

  ScrollTrigger.create({
    trigger: containerHolder,
    start: "top bottom",
    once: true, // Runs only once
    onEnter: () => {
      const state = Flip.getState(holders);

      holders.forEach((holder) => {
        gsap.set(holder, { width: "4.5em", height: "4.5em" }); // Pre-set the smaller scale before animation
        containerHolder.appendChild(holder); // Move elements to new container
      });

      Flip.from(state, {
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2, // Stagger movement
        scale: true, // Ensure GSAP interpolates scale change
      });
    },
  });

  /* Headings Reveal On Scroll */
  let splitText, splitHeading;

  function runSplit() {
    // Initialize SplitType for hover links
    splitText = new SplitType("[hover-link]", {
      types: "words, chars",
    });
  }
  runSplit();

  // Select headings with the attribute
  const headings = document.querySelectorAll("[scroll-reveal]");

  headings.forEach((heading) => {
    // Initialize SplitType.js with lines only
    const splitText = new SplitType(heading, {
      types: "lines",
      lineClass: "line",
    });

    // Wrap each .line in its own .line-wrap div
    const lines = heading.querySelectorAll(".line");
    lines.forEach((line) => {
      const lineWrap = document.createElement("div");
      lineWrap.classList.add("line-wrap");
      line.parentNode.insertBefore(lineWrap, line);
      lineWrap.appendChild(line);
    });

    gsap.fromTo(
      lines,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          end: "top 85%",
        },
      }
    );
  });
  /* Scroll zoom kpi into section */

  // Select the section containing the numbers
  let numberSection = document.querySelector(".kpi-section");

  // Create GSAP animation
  gsap
    .timeline({
      scrollTrigger: {
        trigger: numberSection,
        start: "20% top", // When the section reaches the top
        end: "+=100%", // Duration of the effect
        scrub: 1, // Smooth animation while scrolling
        pin: true, // Keeps the section fixed during the animation
        pinSpacing: false,
      },
    })
    .to(".kpi-number", {
      scale: 1000, // Zoom into numbers (adjust as needed)
      duration: 2.5,
      ease: "power1.in",
      transformOrigin: "40% 70%",
    });

  gsap.set(".about-cover", { opacity: 1 });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".section_about",
        start: "top top",
        end: "+=100%",
        //end: "20% top",
        scrub: 1, // Smooth animation
        pin: true, // Keep section fixed during scroll
      },
    })
    .to(".about-cover", {
      opacity: 0,
      duration: 1,
      ease: "none",
    });

  /* Count Up KPI's */

  window.addEventListener("load", () => {
    const kpi1 = document.querySelector("#kpi .kpi-number.cc-comma");
    const kpi2 = document.querySelector("#kpi .kpi-span");

    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: "#kpi",
        start: "5% top",
      },
    });

    // Count-up animation with specific text content
    tl.from(
      kpi1,
      {
        textContent: 34993, // Starting number
        duration: 2,
        snap: { textContent: 1 }, // Ensures smooth counting
        onUpdate: function () {
          kpi1.textContent = parseInt(kpi1.textContent).toLocaleString(); // Format number with commas
        },
      },
      0
    );

    tl.from(
      kpi2,
      {
        textContent: 20, // start from 0
        duration: 2,
        snap: { textContent: 1 }, // increment by 1
      },
      0
    );
  });

  /* General Parallax */
  document.querySelectorAll("[parallax-container]").forEach((container) => {
    const image = container.querySelector("[parallax-img]");

    if (image) {
      const isHorizontal =
        container.getAttribute("parallax-container") === "horizontal";

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

  /* Horizontal Scroll */

  const hWrap = document.querySelector(".hscroll-wrap");
  const hSection = gsap.utils.toArray(".hscroll-section");
  const navColor = document.querySelector(".navbar");
  const darkhSections = document.querySelectorAll("[dark-section]");

  // Get total width of hscroll-wrap
  let wrapWidth = hWrap.scrollWidth; // Full width of all sections combined

  // Horizontal scroll animation
  let scrollTween = gsap.to(hSection, {
    x: () => -(wrapWidth - window.innerWidth), // Moves based on total width
    ease: "none",
    scrollTrigger: {
      trigger: ".hscroll-wrap",
      pin: true,
      scrub: 1,
      end: () => `+=${wrapWidth}`, // Adjust total scroll distance dynamically
    },
  });

  // Navbar color change inside horizontal scroll
  darkhSections.forEach((section) => {
    gsap.to(navColor, {
      color: "#ffffff", // Change navbar color to white
      scrollTrigger: {
        trigger: section,
        containerAnimation: scrollTween, // Link to horizontal scroll
        start: "left center", // When section enters viewport
        end: "right center",
        toggleActions: "play none reverse none",
        onLeave: () => (navColor.style.color = "#0D0E0F"), // Change back to black when leaving
        onEnterBack: () => (navColor.style.color = "#ffffff"), // Ensure smooth transition back if scrolling backward
      },
    });
  });

  // Count-up animation inside horizontal scroll
  const kpi3 = document.querySelector("#count .number.cc-comma");

  gsap.from(kpi3, {
    textContent: 7870, // Start from 0
    duration: 2.5,
    ease: "power2.out",
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: "#count", // Element inside horizontal scroll
      containerAnimation: scrollTween, // Connect animation to horizontal scroll
      start: "left center", // Adjust trigger position
    },
    onUpdate: function () {
      kpi3.textContent = parseInt(kpi3.textContent).toLocaleString(); // Format with commas
    },
  });

  const growthKpi = document.querySelector("#count .number");

  gsap.from(growthKpi, {
    textContent: 0,
    duration: 2,
    ease: "power2.out",
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: "#count",
      containerAnimation: scrollTween,
      start: "left center",
    },
    onUpdate: function () {
      growthKpi.textContent = parseInt(growthKpi.textContent).toLocaleString(); // Format with commas
    },
  });

  gsap.fromTo(
    ".graph-col",
    { y: "100%" },
    {
      y: "0%",
      ease: "power4.out",
      duration: 1.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#count",
        containerAnimation: scrollTween,
        start: "left center",
      },
    }
  );

  gsap.fromTo(
    ".graph-outer-wrap",
    { y: "100%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      ease: "power2.out",
      duration: 2,
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#count",
        containerAnimation: scrollTween,
        start: "left center",
      },
    }
  );

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
          margin: 0,
          //duration: 5,
          delay: 1,
          ease: "none",
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
        marginBottom: "3em",
        marginLeft: "8.875em",
        duration: 2,
        ease: "none",
        onComplete: () => ScrollTrigger.refresh(),
      },
      "<"
    ); // Overlaps with the closing animation of the previous sub-wrap
  });
}

if (page === "contact") {
  gsap.to(".contact-bg-img", {
    scale: 1.5,
    duration: 30,
    ease: "power1.in",
  });

  //gsap.fromTo(".contact-bg", {x: "120%"}, {x: "0%", ease: "power3.out", duration: 1.5, delay: 0.5,})
}
