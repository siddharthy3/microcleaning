/**
 * Micro Cleaning & Sanitising Solutions - Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const overlay = document.getElementById('overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Navbar Sticky Scroll Shadow
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // Interactive Instant Price Calculator Logic
  // ==========================================================================
  const serviceRates = {
    sofa: { name: 'Sofa Cleaning', rate: 400, unit: 'seat' },
    dining: { name: 'Dining Chair', rate: 350, unit: 'chair' },
    recliner: { name: 'Recliner Cleaning', rate: 700, unit: 'seat' },
    mattress: { name: 'Mattress Deep Clean', rate: 1200, unit: 'mattress' },
    home: { name: 'Full Home Deep Clean (BHK)', rate: 4800, unit: 'bhk' },
    kitchen: { name: 'Kitchen Deep Clean', rate: 2500, unit: 'kitchen' },
    carpet: { name: 'Carpet Cleaning', rate: 1200, unit: 'carpet' },
    car: { name: 'Car Interior Clean', rate: 2500, unit: 'car' }
  };

  const itemCounts = {
    sofa: 3,
    dining: 0,
    recliner: 0,
    mattress: 1,
    home: 0,
    kitchen: 0,
    carpet: 0,
    car: 0
  };

  const selectedListEl = document.getElementById('calcSelectedList');
  const totalAmountEl = document.getElementById('calcTotalAmount');
  const waQuoteBtn = document.getElementById('calcWaBtn');

  function updateCalculator() {
    let total = 0;
    let selectedHTML = '';
    let waMessageItems = [];

    for (const [key, item] of Object.entries(serviceRates)) {
      const count = itemCounts[key];
      const countEl = document.getElementById(`count-${key}`);
      if (countEl) countEl.textContent = count;

      if (count > 0) {
        const itemTotal = count * item.rate;
        total += itemTotal;

        selectedHTML += `
          <li class="calc-selected-item">
            <span>${item.name} (${count} ${item.unit}${count > 1 ? 's' : ''})</span>
            <strong>₹${itemTotal.toLocaleString('en-IN')}</strong>
          </li>
        `;

        waMessageItems.push(`• ${item.name}: ${count} ${item.unit}${count > 1 ? 's' : ''} (₹${itemTotal.toLocaleString('en-IN')})`);
      }
    }

    if (total === 0) {
      selectedHTML = `<li class="calc-selected-item" style="justify-content:center; color: rgba(255,255,255,0.5);">No items selected yet</li>`;
    }

    if (selectedListEl) selectedListEl.innerHTML = selectedHTML;
    if (totalAmountEl) totalAmountEl.textContent = `₹${total.toLocaleString('en-IN')}`;

    // Generate WhatsApp Link
    const phoneNumber = '919022582767';
    let text = `Hello Micro Clean! 👋%0A%0AI would like to book a cleaning service. Here is my estimate quote:%0A%0A`;
    if (waMessageItems.length > 0) {
      text += waMessageItems.join('%0A') + `%0A%0A*Total Estimated Price: ₹${total.toLocaleString('en-IN')}*`;
    } else {
      text += `Please share your service catalog & prices.`;
    }
    text += `%0A%0AAddress/Area: [Enter your location]`;

    if (waQuoteBtn) {
      waQuoteBtn.href = `https://wa.me/${phoneNumber}?text=${text}`;
    }
  }

  // Counter button click listeners
  document.querySelectorAll('.counter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemKey = e.currentTarget.getAttribute('data-item');
      const action = e.currentTarget.getAttribute('data-action');

      if (action === 'plus') {
        itemCounts[itemKey]++;
      } else if (action === 'minus' && itemCounts[itemKey] > 0) {
        itemCounts[itemKey]--;
      }

      updateCalculator();
    });
  });

  // Initial calculator render
  updateCalculator();

  // ==========================================================================
  // Before & After Image Slider Handle Drag
  // ==========================================================================
  const sliderWrapper = document.getElementById('baSliderWrapper');
  const beforeImg = document.getElementById('baBeforeImg');
  const handle = document.getElementById('baHandle');

  if (sliderWrapper && beforeImg && handle) {
    let isDragging = false;

    function setSliderPosition(x) {
      const rect = sliderWrapper.getBoundingClientRect();
      let offsetX = x - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      beforeImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
      handle.style.left = `${percentage}%`;
    }

    sliderWrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile
    sliderWrapper.addEventListener('touchstart', (e) => {
      isDragging = true;
      setSliderPosition(e.touches[0].clientX);
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // ==========================================================================
  // FAQ Accordion Toggle
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // Quick Quote Modal Trigger
  // ==========================================================================
  const quoteModal = document.getElementById('quoteModal');
  const openModalBtns = document.querySelectorAll('.open-quote-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  function openQuoteModal() {
    if (quoteModal) {
      quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQuoteModal() {
    if (quoteModal) {
      quoteModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => btn.addEventListener('click', openQuoteModal));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeQuoteModal);
  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeQuoteModal();
    });
  }

  // Booking Form Submission via WhatsApp
  const modalForm = document.getElementById('modalForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName').value;
      const phone = document.getElementById('modalPhone').value;
      const location = document.getElementById('modalLocation').value;
      const service = document.getElementById('modalService').value;

      const text = `Hello Micro Clean! 👋%0A%0A*New Booking Inquiry*%0A• Name: ${encodeURIComponent(name)}%0A• Phone: ${encodeURIComponent(phone)}%0A• Location: ${encodeURIComponent(location)}%0A• Service Required: ${encodeURIComponent(service)}`;
      window.open(`https://wa.me/919022582767?text=${text}`, '_blank');
      closeQuoteModal();
    });
  }
});