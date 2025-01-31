const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});




// Carousel Logic

const carouselData = [
  {
    title: "Explore the World",
    description: "Embark on a journey of discovery and adventure. Let us guide you through extraordinary experiences.",
  },
  {
    title: "Create Memories",
    description: "Every moment is an opportunity to create lasting memories. Start your story today.",
  },
  {
    title: "Connect & Share",
    description: "Join our community of explorers and share your adventures with like-minded individuals.",
  },
];

// DOM Elements
const heroSection = document.querySelector('.hero');
const carouselImages = document.querySelectorAll('.carousel img');
const carouselTitle = document.getElementById('carousel-title');
const carouselDescription = document.getElementById('carousel-description');
const navButtons = document.querySelectorAll('.nav-btn');
const progressBar = document.querySelector('.progress');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;
let autoplayTimer;
let progressTimer;

// Function to Update Carousel
function updateCarousel(index, direction = 'next') {
  // Reset progress bar
  progressBar.style.width = '0%';
  
  // Update content with animation
  carouselTitle.classList.add('fade-enter');
  carouselDescription.classList.add('fade-enter');
  
  // Update active states
  carouselImages.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });

  // Update text with animation
  setTimeout(() => {
    carouselTitle.textContent = carouselData[index].title;
    carouselDescription.textContent = carouselData[index].description;
    
    carouselTitle.classList.add('fade-enter-active');
    carouselDescription.classList.add('fade-enter-active');
  }, 100);

  // Update navigation
  navButtons.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
    btn.setAttribute('aria-selected', i === index);
  });

  // Start progress bar animation
  progressBar.style.width = '100%';

  // Clean up animation classes
  setTimeout(() => {
    carouselTitle.classList.remove('fade-enter', 'fade-enter-active');
    carouselDescription.classList.remove('fade-enter', 'fade-enter-active');
  }, 500);

  // Reset and start timers
  resetTimers();
}

// Timer Management
function resetTimers() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(showNextImage, 5000);
}

// Navigation Functions
function showNextImage() {
  currentIndex = (currentIndex + 1) % carouselImages.length;
  updateCarousel(currentIndex, 'next');
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
  updateCarousel(currentIndex, 'prev');
}

// Initialize Carousel
updateCarousel(currentIndex);

// Event Listeners
navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentIndex = parseInt(btn.getAttribute('data-index'));
    updateCarousel(currentIndex);
  });
});

prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showPrevImage();
  if (e.key === 'ArrowRight') showNextImage();
});

// Pause on hover
heroSection.addEventListener('mouseenter', () => {
  clearInterval(autoplayTimer);
  progressBar.style.width = '0%';
});

heroSection.addEventListener('mouseleave', () => {
  updateCarousel(currentIndex);
});

// Touch Events
let touchStartX = 0;
let touchEndX = 0;

heroSection.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

heroSection.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      showNextImage();
    } else {
      showPrevImage();
    }
  }
}