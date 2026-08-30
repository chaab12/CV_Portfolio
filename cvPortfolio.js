const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");


// Open / close menu
menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Close menu after clicking a link
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});

// Reveal elements on scroll
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});

const icons = document.querySelectorAll(".tech-icon");

let angle = 0;

const radius = 210;
const speed = 0.5;

function animateOrbit() {

    icons.forEach((icon, index) => {

        const iconAngle =
            angle + (index * (360 / icons.length));

        const radians =
            iconAngle * Math.PI / 180;

        const x =
            Math.sin(radians) * radius;

        const z =
            Math.cos(radians) * radius;

        icon.style.left = "50%";
        icon.style.top = "50%";

        icon.style.transform =
            `translate(-50%, -50%)
             translate3d(${x}px, 0, ${z}px)`;

        if (z > 0) {
            icon.style.zIndex = Math.round(z);
            icon.style.opacity = Math.max(0, z / radius);
        } else {
            icon.style.zIndex = Math.round(z);
            icon.style.opacity = 0;
        }
    });

    angle += speed;

    requestAnimationFrame(animateOrbit);
}

animateOrbit();


const videoModal = document.querySelector("#videoModal");
const videoModalClose = document.querySelector("#videoModalClose");
const projectVideo = document.querySelector("#projectVideo");
const projectVideos = document.querySelectorAll(".project-video");
const videoModalTitle = document.querySelector("#videoModalTitle");


// Open video modal
projectVideos.forEach((project) => {

    project.addEventListener("click", () => {

        const videoPath = project.dataset.video;

        const projectTitle =
            project.querySelector(".video-label span").textContent;


        videoModalTitle.textContent = projectTitle;


        projectVideo.querySelector("source").src = videoPath;

        projectVideo.load();

        videoModal.classList.add("active");

        projectVideo.play();

    });

});

// Close modal
function closeVideoModal() {

    videoModal.classList.remove("active");

    projectVideo.pause();

    projectVideo.currentTime = 0;

    projectVideo.querySelector("source").src = "";

    projectVideo.load();

}


videoModalClose.addEventListener("click", closeVideoModal);


// Close when clicking outside the video
videoModal.addEventListener("click", (event) => {

    if (event.target === videoModal) {
        closeVideoModal();
    }

});