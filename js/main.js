/**
 * XNTROVA TECHNOLOGIES - CLIENT APPLICATION SCRIPT
 * Handles Theme Switcher, Left Mobile Drawer, Multi-Country Selector,
 * Testimonial Slider, Accordions, and AI Chat Assistant.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------
     1. THEME SWITCHER (DARK / LIGHT TOGGLE - DEFAULT: LIGHT)
     ------------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme preference or default to light
  const currentSavedTheme = localStorage.getItem('xntrova-theme') || 'light';
  htmlRoot.setAttribute('data-theme', currentSavedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = htmlRoot.getAttribute('data-theme');
      const targetTheme = activeTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', targetTheme);
      localStorage.setItem('xntrova-theme', targetTheme);
    });
  }

  /* -------------------------------------------------------------
     2. MULTI-COUNTRY SELECTOR DROPDOWN
     ------------------------------------------------------------- */
  const countryBtn = document.getElementById('countryDropdownBtn');
  const countryList = document.getElementById('countryList');
  const currentCountryText = document.getElementById('currentCountry');
  const countryOptions = document.querySelectorAll('.country-option');

  if (countryBtn && countryList) {
    countryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      countryList.classList.toggle('open');
    });

    countryOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        countryOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');

        const selectedCountry = opt.getAttribute('data-country');
        currentCountryText.textContent = selectedCountry;
        countryList.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
      countryList.classList.remove('open');
    });
  }

  /* -------------------------------------------------------------
     3. LEFT-SIDE SLIDING MOBILE DRAWER
     ------------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const drawerServicesToggle = document.getElementById('drawerServicesToggle');
  const drawerServicesMenu = document.getElementById('drawerServicesMenu');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Mobile drawer accordion for services
  if (drawerServicesToggle && drawerServicesMenu) {
    drawerServicesToggle.addEventListener('click', () => {
      drawerServicesMenu.classList.toggle('open');
      const icon = drawerServicesToggle.querySelector('i');
      if (icon) {
        icon.className = drawerServicesMenu.classList.contains('open') 
          ? 'fa-solid fa-minus' 
          : 'fa-solid fa-plus';
      }
    });
  }

  /* -------------------------------------------------------------
     4. TESTIMONIALS SLIDER
     ------------------------------------------------------------- */
  const track = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && prevBtn && nextBtn) {
    let slideIndex = 0;
    const cards = document.querySelectorAll('.review-card');

    function getVisibleCards() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 4;
    }

    function slideTo(index) {
      const cardWidth = cards[0].offsetWidth + 20; // 20px gap
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
      const maxIndex = cards.length - getVisibleCards();
      if (slideIndex < maxIndex) {
        slideIndex++;
      } else {
        slideIndex = 0;
      }
      slideTo(slideIndex);
    });

    prevBtn.addEventListener('click', () => {
      const maxIndex = cards.length - getVisibleCards();
      if (slideIndex > 0) {
        slideIndex--;
      } else {
        slideIndex = maxIndex;
      }
      slideTo(slideIndex);
    });

    window.addEventListener('resize', () => slideTo(slideIndex));
  }

  /* -------------------------------------------------------------
     5. WORKING ACCORDIONS (BOOST SECTION & FAQ)
     ------------------------------------------------------------- */
  const accordions = document.querySelectorAll('.acc-item');

  accordions.forEach(item => {
    const header = item.querySelector('.acc-header');
    header.addEventListener('click', () => {
      const parent = item.parentElement;
      const isCurrentlyActive = item.classList.contains('active');

      parent.querySelectorAll('.acc-item').forEach(sibling => {
        sibling.classList.remove('active');
        const icon = sibling.querySelector('.acc-icon');
        if (icon) {
          icon.className = 'fa-solid fa-plus acc-icon';
        }
      });

      if (!isCurrentlyActive) {
        item.classList.add('active');
        const icon = item.querySelector('.acc-icon');
        if (icon) {
          icon.className = 'fa-solid fa-xmark acc-icon';
        }
      }
    });
  });

  /* -------------------------------------------------------------
     6. FLOATING AI ASSISTANT CHAT
     ------------------------------------------------------------- */
  const assistantToggle = document.getElementById('assistantToggle');
  const bubbleToggle = document.getElementById('bubbleToggle');
  const assistantModal = document.getElementById('assistantModal');
  const closeAssistant = document.getElementById('closeAssistant');
  const assistantForm = document.getElementById('assistantForm');
  const assistantInput = document.getElementById('assistantInput');
  const chatBody = document.getElementById('chatBody');

  function toggleModal() {
    assistantModal.classList.toggle('open');
    if (assistantModal.classList.contains('open')) {
      assistantInput.focus();
    }
  }

  if (assistantToggle) assistantToggle.addEventListener('click', toggleModal);
  if (bubbleToggle) bubbleToggle.addEventListener('click', toggleModal);
  if (closeAssistant) {
    closeAssistant.addEventListener('click', () => {
      assistantModal.classList.remove('open');
    });
  }

  if (assistantForm) {
    assistantForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userText = assistantInput.value.trim();
      if (!userText) return;

      const userBubble = document.createElement('div');
      userBubble.className = 'chat-msg user-msg';
      userBubble.textContent = userText;
      chatBody.appendChild(userBubble);
      assistantInput.value = '';
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-msg bot-msg';
        botBubble.textContent = `Thank you, ${userText}! A senior digital marketing consultant from Xntrova Delhi will reach out to you shortly.`;
        chatBody.appendChild(botBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 700);
    });
  }

  /* -------------------------------------------------------------
     7. HERO AUDIT FORM SUBMISSION
     ------------------------------------------------------------- */
  const heroForm = document.getElementById('heroLeadForm');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('heroName').value;
      alert(`🎉 Thank you, ${name}! Your free digital audit request has been sent to Xntrova Delhi. Our strategy team will reach out within 24 hours.`);
      heroForm.reset();
    });
  }

});