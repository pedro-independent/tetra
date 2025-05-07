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

/* Check Section Theme on Scroll */
function initCheckSectionThemeScroll() {
  const navBar = document.querySelector("[data-nav-bar-height]");
  const themeObserverOffset = navBar ? navBar.offsetHeight / 2 : 0;

  function checkThemeSection() {
    const themeSections = document.querySelectorAll("[data-theme-section]");
    themeSections.forEach((themeSection) => {
      const rect = themeSection.getBoundingClientRect();
      const themeSectionTop = rect.top;
      const themeSectionBottom = rect.bottom;

      if (
        themeSectionTop <= themeObserverOffset &&
        themeSectionBottom >= themeObserverOffset
      ) {
        const themeSectionActive = themeSection.getAttribute("data-theme-section") || "";
        const bgSectionActive = themeSection.getAttribute("data-bg-section") || "";

        document.querySelectorAll("[data-theme-nav]").forEach((elem) => {
          if (elem.getAttribute("data-theme-nav") !== themeSectionActive) {
            elem.setAttribute("data-theme-nav", themeSectionActive);
          }
        });

        document.querySelectorAll("[data-bg-nav]").forEach((elem) => {
          if (elem.getAttribute("data-bg-nav") !== bgSectionActive) {
            elem.setAttribute("data-bg-nav", bgSectionActive);
          }
        });
      }
    });
  }

  function startThemeCheck() {
    document.addEventListener("scroll", checkThemeSection);
  }

  checkThemeSection();
  startThemeCheck();
}

// Initialize Check Section Theme on Scroll
initCheckSectionThemeScroll();

/* Menu Open */
const menuBtn = document.querySelector(".navbar-mobile-btn"); // Button trigger
const navFill = document.querySelector(".nav-fill");

let menuOpen = false;

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    navFill.style.display = "block"; // Show menu before animation starts

    gsap.to(navFill, {
      y: "0%",
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        menuOpen = true;
        menuBtn.textContent = "Close"; // Change button text to "Close"
      },
    });
  } else {
    gsap.to(navFill, {
      y: "-100%",
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        navFill.style.display = "none"; // Hide menu after animation completes
        menuOpen = false;
        menuBtn.textContent = "Menu"; // Change button text back to "Menu"
      },
    });
  }
});

if (page === "home") {
  function initLoader() {
    if (sessionStorage.getItem("loaderPlayed")) {
      // Loader has already played during this session
      document.querySelector(".loading-screen").style.display = "none";
      gsap.set("h1", { opacity: 1 }); // optional fallback
      gsap.set(".hero-p", { opacity: 1 });
      gsap.set("#hero-btn", { opacity: 1 });
      return;
    }
  
    // Mark loader as played
    sessionStorage.setItem("loaderPlayed", "true");
  
    var loading = gsap.timeline();
    gsap.defaults({
      ease: "Expo.easeInOut",
      duration: 1.2,
    });
  
    let splitH1 = new SplitType("h1", { types: "lines" });
    let splitLoadText = new SplitType(".hero-p", { types: "lines" });
  
    loading.set(".loading-screen", {
      display: "block",
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
    });
  
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
  
  initLoader();
  
  
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

  /* Count Up KPI's */
  window.addEventListener("load", () => {
    const kpi1 = document.querySelector(".kpi-number.cc-comma");
    const kpi2 = document.querySelector(".kpi-span");

    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: ".shortage-img-container-holder",
        start: "top bottom",
      },
    });
  });

  /* General Parallax */
  document.querySelectorAll("[parallax-container]").forEach((container) => {
    const image = container.querySelector("[parallax-img]");
  
    if (image) {
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
  if (window.innerWidth > 991) {
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
  // darkhSections.forEach((section) => {
  //   gsap.to(navColor, {
  //     color: "#ffffff", // Change navbar color to white
  //     scrollTrigger: {
  //       trigger: section,
  //       containerAnimation: scrollTween, // Link to horizontal scroll
  //       start: "left center", // When section enters viewport
  //       end: "right center",
  //       toggleActions: "play none reverse none",
  //       onLeave: () => (navColor.style.color = "#0D0E0F"), // Change back to black when leaving
  //       onEnterBack: () => (navColor.style.color = "#ffffff"), // Ensure smooth transition back if scrolling backward
  //     },
  //   });
  // });

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
}
  /* Program Scroll Animation */
  if (window.innerWidth > 991) {
    gsap.set(".program-item-sub-wrap", {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
    });
    
    let homeValues = gsap.timeline({
      scrollTrigger: {
        trigger: ".section_program",
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
        // markers: true,
      },
    });
    
    const items = document.querySelectorAll(".program-item-wrap");
    const subItems = document.querySelectorAll(".program-item-sub-wrap");
    
    items.forEach((item, index) => {
      if (index > 0) {
        homeValues.to(
          subItems[index - 1],
          {
            height: 0,
            opacity: 0,
            marginTop: 0,
            marginBottom: 0,
            duration: 2, // smoother close
            ease: "none",
          },
          ">"
        );
      }
    
      homeValues.to(
        subItems[index],
        {
          height: "auto",
          opacity: 1,
          marginTop: "2em",
          marginBottom: "3em",
          //marginLeft: "8.875em",
          duration: 2, // smoother open
          ease: "none",
          onComplete: () => ScrollTrigger.refresh(),
        },
        "<"
      );
    });    
}

    /* Team Overlay */
    const teamItems = document.querySelectorAll(".team-item");
    const overlay = document.querySelector(".team-overlay");
    const closeIcons = document.querySelectorAll(".close-modal-btn");
    
    function openModal() {
      document.body.style.overflow = "hidden"; // Prevent body scroll
      lenis.stop();
    }
    
    function closeModal() {
      document.body.style.overflow = ""; // Restore scroll
      lenis.start();
    }
    
    
    function hideOverlay() {
      const activeBio = overlay.querySelector(".team-bio-item.active");
    
      if (activeBio) {
        gsap.to(activeBio, {
          x: "100%",
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            activeBio.classList.remove("active");
            gsap.set(overlay, { display: "none" });
            closeModal();
          }
        });
      } else {
        gsap.set(overlay, { display: "none" });
        closeModal();
      }
    }
    
    teamItems.forEach(item => {
      item.addEventListener("click", () => {
        const name = item.getAttribute("data-name");
        const allBios = overlay.querySelectorAll(".team-bio-item");
    
        gsap.set(overlay, { display: "block" });
        openModal();
    
        allBios.forEach(bio => {
          gsap.set(bio, { x: "100%" });
          bio.classList.remove("active");
        });
    
        const targetBio = overlay.querySelector(`.team-bio-item[data-name="${name}"]`);
        if (targetBio) {
          targetBio.classList.add("active");
          gsap.to(targetBio, {
            x: "0%",
            duration: 1,
            ease: "power2.out"
          });
        }
      });
    });
    
    // Attach close button handler to all modal close buttons
    closeIcons.forEach(icon => {
      icon.addEventListener("click", hideOverlay);
    });
    
    overlay.addEventListener("click", (e) => {
      if (e.target.closest(".team-bio-item")) return;
      hideOverlay();
    });
    
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const isOverlayVisible = window.getComputedStyle(overlay).display !== "none";
        if (isOverlayVisible) {
          hideOverlay();
        }
      }
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
