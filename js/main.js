/* === LOGO TYPING ANIMATION === */    
const logoText = document.querySelector('.logo-text');
const fullLogoText = 'CA';

let currentIndex = 0;
let isDeleting = false;

function typeLogo() {
  if (!isDeleting) {
    currentIndex += 1;
    logoText.textContent = fullLogoText.slice(0, currentIndex);

    if (currentIndex === fullLogoText.length) {
      isDeleting = true;
      setTimeout(typeLogo, 1800);
      return;
    }

    setTimeout(typeLogo, 500);
  } else {
    currentIndex -= 1;
    logoText.textContent = fullLogoText.slice(0, currentIndex);

    if (currentIndex === 0) {
      isDeleting = false;
      setTimeout(typeLogo, 600);
      return;
    }

    setTimeout(typeLogo, 300);
  }
}

logoText.textContent = '';
typeLogo();

/*  ---ACTIVE NAVIGATION LINK---  */
const sections = document.querySelectorAll('main section[id]');

const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

/* IntersectionObserver watches sections as they enter the central area of the browser viewport. */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const currentSectionId = entry.target.id;

      /* Remove the active style from all navigation links */
      navLinks.forEach((link) => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      });

      /* Find the link whose href matches the visible section, for example href="#experience" for id="experience". */
      const activeLink = document.querySelector(
        `.nav-links a[href="#${currentSectionId}"]`
      );

      if (activeLink) {
        activeLink.classList.add('active');

        /* aria-current helps screen-reader users understand which portfolio section they are currently reading. */
        activeLink.setAttribute('aria-current', 'page');
      }
    });
  },
  {
    /* This creates a horizontal “reading zone” around the middle of the viewport. A section becomes active when it enters it. */
    rootMargin: '-25% 0px -60% 0px',
    threshold: 0
  }
);

/* Start watching every section */
sections.forEach((section) => {
  sectionObserver.observe(section);
});

/* LOGIC FOR SLIDESHOW */
let currentImages = [];
let slideshowIndex = 0;

function openSlideshow(images) {
  currentImages = images;
  slideshowIndex = 0;
  updateModalImage();
  document.getElementById('slideshow-modal').style.display = 'flex';
}

function updateModalImage() {
  const modalImg = document.getElementById('slideshow-img');
  modalImg.src = currentImages[slideshowIndex];
  modalImg.alt = 'Screenshot ' + (slideshowIndex + 1) + ' of ' + currentImages.length;
}

document.querySelector('.close-modal').onclick = () => {
  document.getElementById('slideshow-modal').style.display = 'none';
};

document.querySelector('.modal-next').onclick = () => {
  if (slideshowIndex === currentImages.length - 1) {
    document.querySelector('.close-modal').click();   // Last image reached— close the modal
  } else {                                            // Not the last image yet — go forward
    slideshowIndex++;
    updateModalImage();
  }
};

document.querySelector('.modal-prev').onclick = () => {
  slideshowIndex = (slideshowIndex - 1 + currentImages.length) % currentImages.length;
  updateModalImage();
};

// Keyboard navigation for slideshow modal
document.addEventListener('keydown', function (e) {
  const modal = document.getElementById('slideshow-modal');
  const isOpen = modal.style.display === 'flex';

  if (!isOpen) return; // only active when modal is open

  if (e.key === 'ArrowRight') {
    document.querySelector('.modal-next').click();
  }

  if (e.key === 'ArrowLeft') {
    document.querySelector('.modal-prev').click();
  }

  if (e.key === 'Escape') {
    document.querySelector('.close-modal').click();
  }
});

// Close when clicking outside the image
window.onclick = (event) => {
  const modal = document.getElementById('slideshow-modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};