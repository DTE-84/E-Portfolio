 document.addEventListener("DOMContentLoaded", () => {
          // --- 1. DEFINE ALL YOUR FUNCTIONS FIRST ---
     
          let isModalOpen = false;
          let slideIndex = 1;
         let slideTimeout;
          const scaleFactor = 1 / 20;
     
         function moveBackground(event) {
             const shapes = document.querySelectorAll(".shape");
             const x = event.clientX / scaleFactor;
             const y = event.clientY / scaleFactor;
             for (let i = 0; i < shapes.length; ++i) {
                 const isOdd = i % 2 !== 0;
                 const boolInt = isOdd ? -1 : 1;
                 shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
             }
         }
    
         function toggleModal() {
             isModalOpen = !isModalOpen;
             if (isModalOpen) {
                 document.body.classList.add("modal--open");
             } else {
                 document.body.classList.remove("modal--open");
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
                         "There was a problem sending your message, please try again later. If the problem persists, please contact me directly at drew.t.ernst@gmail.com"
                     )
                 });
                 document.getElementById("contact__form").addEventListener("submit", () => {
                     alert("Thanks for the message! Looking forward to speaking to you soon.");
                 });
         }
    
         function toggleContrast() {
             document.body.classList.toggle("dark-theme");
         }
    
         function toggleMenu() {
             document.body.classList.toggle("menu--open");
         }
    
         // Carousel Functions
         function plusSlides(n) {
             showSlides(slideIndex += n);
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
             }
             if (dots[slideIndex - 1]) {
                 dots[slideIndex - 1].classList.add("active");
             }
             slideTimeout = setTimeout(() => plusSlides(1), 5000);
        }
   
        function pauseCarousel() {
            clearTimeout(slideTimeout);
        }
   
        function resumeCarousel() {
            slideTimeout = setTimeout(() => plusSlides(1), 5000);
        }
   
        // --- 2. PRELOADER LOGIC ---
        const preloader = document.getElementById('preloader');
        const mainContent = document.getElementById('main-content');
        let preloaderTimeout;
   
        function initPageFunctions() {
             // This function is called AFTER the preloader is gone.
    
             // --- EVENT LISTENERS ---
    
             // Modal Toggle Buttons (for Contact and About)
            const modalTogglers = document.querySelectorAll('[onclick="toggleModal()"]');
            modalTogglers.forEach(toggler => {
                 toggler.onclick = (e) => {
                   e.preventDefault(); // Prevent '#' from jumping to top of page
                    toggleModal();
                };
            });
   
            // Close Modal Button
            const modalExit = document.querySelector('.modal__exit');
            if(modalExit) {
                modalExit.onclick = () => toggleModal();
            }
   
            // Contact Form Submission
            const contactForm = document.getElementById('contact__form');
            if(contactForm) {
                contactForm.onsubmit = (e) => contact(e);
            }
   
            // Contrast Button
            const contrastButton = document.querySelector('.contrast__btn');
            if(contrastButton) {
               contrastButton.onclick = () => toggleContrast();
            }
   
            // Mail Button
            const mailButton = document.querySelector('.mail__btn');
           if(mailButton) {
                mailButton.onclick = (e) => {
                    e.preventDefault();
                    toggleModal();
                };
            }
   
            // Hamburger Menu Toggle
            const menuTogglers = document.querySelectorAll('[onclick*="toggleMenu"]');
           menuTogglers.forEach(toggler => {
                // We re-assign the original onclick logic here in JS
                const originalOnclick = toggler.getAttribute('onclick');
                toggler.onclick = () => {
                    eval(originalOnclick); // This will execute toggleMenu() or toggleMenu();
      toggleModal()
                };
            });
   
            // Background Shape Movement
            const landingPage = document.getElementById('landing-page');
         if(landingPage){
                landingPage.onmousemove = (e) => moveBackground(e);
            }
   
            // --- INITIALIZERS ---
   
            // Initialize Carousel
            showSlides(slideIndex);
   
            // Initialize Carousel Dots
            const dots = document.querySelectorAll(".dot");
            dots.forEach((dot, index) => {
                dot.onclick = () => currentSlide(index + 1);
            });
   
            // Initialize Carousel Pause/Resume
           const projectWrappers = document.querySelectorAll(".project__wrapper");
            projectWrappers.forEach(wrapper => {
                wrapper.addEventListener("mouseenter", pauseCarousel);
                wrapper.addEventListener("mouseleave", resumeCarousel);
           });
   
           // Initialize Link Hover Effects
            const animatedLinks = document.querySelectorAll(".link__hover-effect");
            animatedLinks.forEach(link => {
                const letters = link.querySelectorAll(".letter");
               letters.forEach((letter, index) => {
                   letter.style.setProperty('--sibling-index', index);
                });
            });
        }
   
        function showMainContent() {
            if (preloader) {
                preloader.classList.add('preloader--hidden');
                preloader.addEventListener('transitionend', () => preloader.remove());
            }
            if (mainContent) {
                mainContent.style.display = 'block';
                void mainContent.offsetWidth;
                mainContent.style.opacity = '1';
            }
            document.body.classList.remove("no-scroll");
   
            // Call the function that sets up your page's JS
            initPageFunctions();
   
           clearTimeout(preloaderTimeout);
        }
   
        document.body.classList.add("no-scroll");
        preloaderTimeout = setTimeout(showMainContent, 5000); // Set to 5 seconds
    });