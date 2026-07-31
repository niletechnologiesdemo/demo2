$(document).ready(function () {

    // Register GSAP Plugins
    gsap.registerPlugin(
        ScrollTrigger,
        ScrollSmoother,
        ScrollToPlugin
    );

    // Smooth Scroll
    if ($("#smooth-wrapper").length && $("#smooth-content").length) {

        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.35,
            effects: true,
            smoothTouch: 0.1,
            ignoreMobileResize: true
        });

    }

    // Main Timeline
    const tl = gsap.timeline();
    let pr = gsap.matchMedia();


    // 37. studio-project animation //
    pr.add("(min-width: 767px)", () => {
        function perspective() {
            if ($('.dgs-project-item-wrap').length) {
                gsap.set('.dgs-project-thumb', { perspective: 60,});
                $('.dgs-project-thumb img').each(function () {
                    var slide = $(this);
                    gsap.fromTo(this, {
                        rotationX: 1.8,
                        z: '0vh'
                    }, {
                        rotationX: -.5,
                        z: '-2vh',
                        scrollTrigger: {
                            trigger: slide,
                            start: "top+=150px bottom",
                            end: "bottom top",
                            immediateRender: false,
                            scrub: 0.1,
                        }
                    });
                });
            }
        }
        perspective()
    });


    

});





$(document).ready(function () {

  if ($(".work-title").length > 0) {

    let work_title_anim = document.querySelector(".work-title");
    let content_1 = document.querySelector(".first");
    let content_2 = document.querySelector(".last");

    gsap.to(content_1, {
      marginLeft: "0px",
      ease: "power2.out",
      scrollTrigger: {
        trigger: work_title_anim,
        scrub: 2,
        start: "top 90%",
        end: "top center",
      }
    });

    gsap.to(content_2, {
      marginRight: "0px",
      ease: "power2.out",
      scrollTrigger: {
        trigger: work_title_anim,
        scrub: 2,
        start: "top 90%",
        end: "top center",
      }
    });

  }

});

$(document).ready(function () {
    //******* home-1 text-slider *******
    var swiper = new Swiper(".tp-text-slide-active", {
        slidesPerView: 'auto',
        spaceBetween: 22,
        loop: true,
        freeMode: true,
        centeredSlides: true,
        allowTouchMove: false,
        speed: 10000,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
        },
    });
});

$(document).ready(function () {
// cursor effect
    document.querySelectorAll(".cursor-btn").forEach((btn) => {

        const cursor = btn.querySelector(".read-more-cursor");

        btn.addEventListener("mousemove", (e) => {

            const rect = btn.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            cursor.style.left = x + "px";
            cursor.style.top = y + "px";
        });

    });

});


$(document).ready(function () {

var swiper = new Swiper(".bg-motion-slider", {

    loop:true,
    speed:1800,
    effect:"slide",

    autoplay:{
        delay:4000,
        disableOnInteraction:false,
    },

    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",
    },

});

});

$(document).ready(function () {
const card = document.querySelector(".merchandise-image-card");
const glare = document.querySelector(".glare");

card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;

    card.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.05)
    `;

    glare.style.background = `
        radial-gradient(
            circle at ${x}px ${y}px,
            rgba(255,255,255,0.4),
            transparent 40%
        )
    `;
});

card.addEventListener("mouseleave", () => {

    card.style.transform = `
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
    `;

    glare.style.background = `
        radial-gradient(
            circle,
            rgba(255,255,255,0.35),
            transparent 60%
        )
    `;
});

});

$(document).ready(function () {
  // Reveal chapters on scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.chapter-section').forEach(section => {
        observer.observe(section);
    });

    // Sticky nav style update
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('bg-onyx-black/90');
        } else {
            nav.classList.remove('bg-onyx-black/90');
        }
    });
});