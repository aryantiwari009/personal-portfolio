// JavaScript Interactivity: main.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE NAVIGATION BURGER MENU ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // --- SLIDING HEADER DISK & SCROLL LINK TRACKING ENGINE ---
  const sections = document.querySelectorAll('section[id]');
  const navIndicator = document.getElementById('nav-indicator');
  const navItems = document.querySelectorAll('#desktop-nav .nav-item');

  // Core geometry logic to shift the yellow disk panel background accurately
  function moveIndicator(element) {
    if (!navIndicator || !element) return;
    
    const targetLeft = element.offsetLeft;
    const targetWidth = element.offsetWidth;

    navIndicator.style.left = `${targetLeft}px`;
    navIndicator.style.width = `${targetWidth}px`;
  }

  function updateLinkStyles(activeItem) {
    navItems.forEach(item => {
      if (item === activeItem) {
        item.classList.remove('text-gray-600');
        item.classList.add('text-brandDark');
      } else {
        item.classList.remove('text-brandDark');
        item.classList.add('text-gray-600');
      }
    });
  }

  // Manual link selection handler tracking click vectors
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      moveIndicator(item);
      updateLinkStyles(item);
    });
  });

  // HIGH-PERFORMANCE ASYNCHRONOUS SCROLL TRACKING STRUCTURE (Intersection Observer)
  const observerOptions = {
    root: null, // Scans across active window viewport dimensions
    rootMargin: '-30% 0px -60% 0px', // Perfectly maps triggers directly to user's reading focal area
    threshold: 0
  };

  const scrollNavObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        
        navItems.forEach((link) => {
          const hrefTarget = link.getAttribute('href').replace('#', '');
          
          if (hrefTarget === activeId) {
            updateLinkStyles(link);
            moveIndicator(link);
          }
        });
      }
    });
  }, observerOptions);

  // Bind scroll monitors securely onto layout section boundaries
  sections.forEach((section) => scrollNavObserver.observe(section));

  // Recalculates indicator layout bounding boxes smoothly if user resizes desktop monitor window
  window.addEventListener('resize', () => {
    const currentActiveLink = document.querySelector('#desktop-nav .nav-item.text-brandDark');
    if (currentActiveLink) moveIndicator(currentActiveLink);
  });

  // Initial Page Paint Default Focus Setup
  if (navItems.length > 0) {
    setTimeout(() => {
      const activeOnLoad = document.querySelector('#desktop-nav .nav-item.text-brandDark') || navItems[0];
      moveIndicator(activeOnLoad);
      updateLinkStyles(activeOnLoad);
    }, 150);
  }

  // --- DYNAMIC TYPEWRITER LOGIC SETUP ---
  const phrases = [
    "Full-Stack Developer", 
    "Problem Solver", 
    "Making Things That Matters"
  ];
  
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  const typewriterTarget = document.getElementById('typewriter');
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typewriterTarget.textContent = currentPhrase.substring(0, characterIndex - 1);
      characterIndex--;
    } else {
      typewriterTarget.textContent = currentPhrase.substring(0, characterIndex + 1);
      characterIndex++;
    }
    
    let typeSpeed = isDeleting ? 40 : 100;
    
    if (!isDeleting && characterIndex === currentPhrase.length) {
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  if (typewriterTarget) {
    type();
  }

  // --- SCROLL REVEAL ANIMATION ENGINE ---
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- DYNAMIC READ-MORE PAGINATION LOGIC ENGINE ---
  function setupSectionPagination(gridId, triggerBoxId, loadBtnId, maxVisible = 3) {
    const gridContainer = document.getElementById(gridId);
    const triggerBox = document.getElementById(triggerBoxId);
    const loadBtn = document.getElementById(loadBtnId);
    
    if (!gridContainer || !triggerBox || !loadBtn) return;

    const items = Array.from(gridContainer.children);
    
    if (items.length > maxVisible) {
      triggerBox.classList.remove('hidden');
      triggerBox.classList.add('flex');

      items.forEach((item, index) => {
        if (index >= maxVisible) {
          item.classList.add('hidden', 'paginated-hidden');
        }
      });

      loadBtn.addEventListener('click', () => {
        items.forEach(item => {
          if (item.classList.contains('paginated-hidden')) {
            item.classList.remove('hidden', 'paginated-hidden');
            setTimeout(() => {
              item.classList.add('reveal-active');
            }, 50);
          }
        });
        triggerBox.remove();
      });
    }
  }

  setupSectionPagination('projects-grid', 'projects-trigger-box', 'btn-load-projects', 3);
  setupSectionPagination('experience-grid', 'experience-trigger-box', 'btn-load-experience', 2);


  // --- DYNAMIC PROJECT DESCRIPTION MODAL SYSTEM DATA MAP ---
  const projectDetailsMap = {
    portfolio: {
      title: "Personal Portfolio",
      icon: "fa-solid fa-image-portrait",
      tags: ["HTML5", "Tailwind CSS", "JavaScript", "Responsive Design"],
      description: "A beautifully streamlined and optimized single-page web environment developed to catalog professional technical milestones, personal computing stack qualifications, and continuous delivery systems engineering history interactively.",
      features: ["Dynamic client-side pagination structures", "Intersection Observer navigation sync mechanisms", "Fluid viewport orientation auto-scaling matrices"],
      links: [
        { label: "Live Demo", url: "https://aryan-tiwari.vercel.app/", icon: "fa-solid fa-globe" },
        { label: "GitHub Repo", url: "https://github.com/aryantiwari009/personal-portfolio", icon: "fa-brands fa-github" }
      ]
    },
    scraper: {
      title: "Scraper 1",
      icon: "fa-solid fa-spider",
      tags: ["Node.js", "TypeScript", "Cheerio", "Puppeteer", "Automation"],
      description: "An advanced, high-efficiency crawling engine customized for programmatic data indexing pipelines. It automates concurrent page navigation, handles complex structural DOM trees, manages cookie sessions, and transforms raw web parameters into cleanly structured semantic datasets efficiently.",
      features: ["Asynchronous multi-thread request throttling and proxy rotation mechanics", "Robust raw DOM serialization with precise custom JSON layout parsing rules", "Integrated rate-limiting failsafes and automated query exception handlers"],
      links: [
        { label: "Live Preview", url: "#", icon: "fa-solid fa-bolt" },
        { label: "GitHub Source", url: "https://github.com/aryantiwari009/Devflow", icon: "fa-brands fa-github" }
      ]
    },
    devflow: {
      title: "Devflow",
      icon: "fa-solid fa-layer-group",
      tags: ["Next.js", "React", "Tailwind CSS", "Full-Stack"],
      inMaking: true, // <--- ADDED STATUS FLAG TRIGGER FOR INDIVIDUAL PROJECT BLOCK
      description: "A full-stack Stack Overflow-style knowledge sharing ecosystem custom built for developers to ask questions, assist each other with debugging code, and cast upvotes or downvotes asynchronously on technical solutions.",
      features: ["Advanced categorization architecture using robust search filter tags", "Comprehensive rich text markdown syntax editor support", "Highly responsive forum layout configured for both mobile and desktop screen viewports"],
      links: [
        { label: "GitHub Repo", url: "https://github.com/aryantiwari009/Devflow", icon: "fa-brands fa-github" }
      ]
    }
  };

  // --- MODAL ENGINE REGISTRAR EVENT LOGIC ---
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  
  if (modal) {
    let linksSection = document.getElementById('modal-links-section');
    if (!linksSection) {
      const linksContainerSkeleton = `
        <div id="modal-links-section" class="space-y-3 pt-2">
          <h4 class="font-heading uppercase font-bold text-xs tracking-widest text-gray-400">Project Links</h4>
          <div id="modal-links" class="flex flex-wrap gap-4"></div>
        </div>`;
      modal.querySelector('.max-w-2xl').insertAdjacentHTML('beforeend', linksContainerSkeleton);
      linksSection = document.getElementById('modal-links-section');
    }
    const modalLinks = document.getElementById('modal-links');

    document.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('[data-project-id]');
      if (!targetBtn) return;
      
      const projectId = targetBtn.getAttribute('data-project-id');
      const data = projectDetailsMap[projectId];
      
      if (!data) return;

      document.getElementById('modal-icon').innerHTML = `<i class="${data.icon} text-brandDark"></i>`;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-description').textContent = data.description;

      const tagsContainer = document.getElementById('modal-tags');
      tagsContainer.innerHTML = '';
      
      // DYNAMIC RENDERING FOR "IN MAKING" BADGE
      if (data.inMaking) {
        tagsContainer.innerHTML += `
          <span class="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 border border-amber-500/30 text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-md font-sans animate-pulse">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> In Making
          </span>`;
      }

      data.tags.forEach(tag => {
        tagsContainer.innerHTML += `<span class="bg-brandBg text-brandDark border border-gray-200 text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-md font-sans">${tag}</span>`;
      });

      const featuresList = document.getElementById('modal-features');
      const featuresSection = document.getElementById('modal-features-section');
      featuresList.innerHTML = '';
      if (data.features && data.features.length > 0) {
        featuresSection.classList.remove('hidden');
        data.features.forEach(feat => {
          featuresList.innerHTML += `<li>${feat}</li>`;
        });
      } else {
        featuresSection.classList.add('hidden');
      }

      modalLinks.innerHTML = '';
      if (data.links && data.links.length > 0) {
        linksSection.classList.remove('hidden');
        data.links.forEach(link => {
          modalLinks.innerHTML += `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-brandDark text-brandYellow hover:text-white text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-xl shadow-md transition-colors duration-200 font-heading">
              <i class="${link.icon}"></i> ${link.label}
            </a>`;
        });
      } else {
        linksSection.classList.add('hidden');
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden'; 
      
      setTimeout(() => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('.max-w-2xl').classList.remove('scale-95');
      }, 20);
    });

    const closeModalWindow = () => {
      modal.classList.add('opacity-0', 'pointer-events-none');
      modal.querySelector('.max-w-2xl').classList.add('scale-95');
      document.body.style.overflow = ''; 
      
      setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
      }, 300);
    };

    modalClose.addEventListener('click', closeModalWindow);
    modalBackdrop.addEventListener('click', closeModalWindow);
  }

  console.log("Portfolio workspace assets connected smoothly.");
});

// --- DYNAMIC CONTACT SUCCESS BANNER HANDLER ---
  const successBanner = document.getElementById('success-banner');
  const closeBannerBtn = document.getElementById('close-banner-btn');

  if (successBanner && closeBannerBtn) {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if the URL contains the success flag redirected from the backend proxy
    if (urlParams.get('success') === 'true') {
      successBanner.classList.remove('hidden');
      
      setTimeout(() => {
        successBanner.classList.remove('-translate-y-full');
      }, 100);

      // Clean up the address bar URL string so '?success=true' is hidden visually
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash;
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);

      // Automatic slide-up hide timer after 7 seconds
      const autoHideTimer = setTimeout(() => {
        closeBanner();
      }, 7000);

      closeBannerBtn.addEventListener('click', () => {
        clearTimeout(autoHideTimer);
        closeBanner();
      });
    }

    function closeBanner() {
      successBanner.add('-translate-y-full');
      setTimeout(() => {
        successBanner.add('hidden');
      }, 500);
    }
  }