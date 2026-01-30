function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX / 20;
  const y = event.clientY / 20;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    // Add rotation to every shape
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`
  }
}

// 1. Foundation Variables
let isModalOpen = false;
let slideIndex = 1;
let slideTimeout;
const scaleFactor = 1 / 20;

document.addEventListener("DOMContentLoaded", () => {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.onclick = () => currentSlide(index + 1);
    });
});

// 2. The Modal - Now with a "Safety Logger"
function toggleModal() {
    console.log("Toggle Modal Clicked!"); // This will show in F12 Console
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
    console.log("Dot clicked, going to slide:", n);
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

// CONTRAST TOGGLE
function toggleContrast() {
    console.log("Contrast toggled!"); // Check F12 console for this
    document.body.classList.toggle("dark-theme");
    
    // Save preference
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

// HAMBURGER MENU TOGGLE
function toggleMenu() {
    console.log("Menu toggled!"); // Check F12 console for this
    document.body.classList.toggle("menu--open");
    
    // Prevent background scrolling when menu is open
    if (document.body.classList.contains("menu--open")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "visible";
    }
}

// 4. Initialize everything
window.onload = () => {
    showSlides(slideIndex);
};