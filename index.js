document.addEventListener("DOMContentLoaded", () => {
    // New preloader logic
    document.body.classList.add("no-scroll"); // Prevent scrolling immediately

    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('preloader--hidden');
            // Remove the preloader from the DOM after its transition ends
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
            });
        }
        if (mainContent) {
            mainContent.style.display = 'block'; // Make it visible
            void mainContent.offsetWidth; // Force reflow
            mainContent.style.opacity = '1';    // Fade it in
        }
        document.body.classList.remove("no-scroll"); // Re-enable scrolling
        
        // Ensure carousel starts after preloader is hidden
        showSlides(slideIndex); 
    }

    // Set timeout to hide preloader after 3 seconds
    setTimeout(hidePreloader, 3000);

    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.onclick = () => currentSlide(index + 1);
    });

    const projectWrappers = document.querySelectorAll(".project__wrapper");
    projectWrappers.forEach(wrapper => {
        wrapper.addEventListener("mouseenter", pauseCarousel);
        wrapper.addEventListener("mouseleave", resumeCarousel);
    });
    
    const animatedLinks = document.querySelectorAll(".link__hover-effect");
    animatedLinks.forEach(link => {
        const letters = link.querySelectorAll(".letter");
        letters.forEach((letter, index) => {
            letter.style.setProperty('--sibling-index', index);
        });
    });

    // Initial Modal Logic - Merged
    const initialModalOverlay = document.getElementById('initialModalOverlay');
    const initialModalContent = document.querySelector('.initial-modal-content');
    const myJourneyButton = document.getElementById('myJourneyButton');
    const shapes = document.querySelectorAll('.shape'); 

    if (initialModalOverlay && initialModalContent) {
        initialModalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 

       
        shapes.forEach(shape => shape.classList.add('visible'));

        
        setTimeout(() => {
            initialModalContent.classList.add('show-content');
        }, 100); 
    }

    if (myJourneyButton) {
        myJourneyButton.addEventListener('click', () => {
            if (initialModalOverlay) {
                initialModalOverlay.classList.add('hidden'); 
            }
            document.body.style.overflow = 'auto'; 
            
            shapes.forEach(shape => shape.classList.remove('visible'));
        });
    }
});


function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX / 20;
  const y = event.clientY / 20;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`
  }
}

// 1. Foundation Variables
let isModalOpen = false;
let slideIndex = 1;
let slideTimeout;
const scaleFactor = 1 / 20;


function toggleModal() {
    isModalOpen = !isModalOpen;
    if (isModalOpen) {
        document.body.classList.add("modal--open");
    } else {
        document.body.classList.remove("modal--open");
    }
}

// 3. The Carousel Logic
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function currentSlide(n) {
    clearTimeout(slideTimeout);
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return; 

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active");
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].classList.add("active");
        
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].classList.add("active");
        }
    }

    clearTimeout(slideTimeout);
    slideTimeout = setTimeout(() => plusSlides(1), 5000);
}

function pauseCarousel() {
    clearTimeout(slideTimeout);
}

function resumeCarousel() {
    slideTimeout = setTimeout(() => plusSlides(1), 5000);
}

// CONTRAST TOGGLE
function toggleContrast() {
    document.body.classList.toggle("dark-theme");
    
    // Save preference
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

// HAMBURGER MENU TOGGLE
function toggleMenu() {
    document.body.classList.toggle("menu--open");
    
    
    if (document.body.classList.contains("menu--open")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "visible";
    }
}

function contact(event) {
   event.preventDefault();
   const loading = document.querySelector(".modal__overlay--loading");
   const success = document.querySelector(".modal__overlay--success");
   loading.classList.add("modal__overlay--visible");
   emailjs
     .sendForm(
       "service_akgmg6r",
       "template_nx4fvkb",
          event.target,
          "zmPiRmxRkScwdiYFX"
        )
        .then(() => {
          loading.classList.remove("modal__overlay--visible");
          success.classList.add("modal__overlay--visible");
       setTimeout(() => {
            success.classList.remove("modal__overlay--visible");
            toggleModal();
            }, 2000);
            const form = document.getElementById("contact__form");
            form.reset();
        })
        .catch(() => {
          loading.classList.remove("modal__overlay--visible");
          alert(
            "The email service is temporarily unavailable. Please contact me directly at drew.t.ernst@gmail.com"
          );
        });
    }