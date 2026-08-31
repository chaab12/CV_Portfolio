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


/* =========================
   3D ORBITAL ANIMATION
   Three intersecting layers
========================= */
const heroImage =
    document.querySelector(".hero-image");

const profileImage =
    document.querySelector(".profile-image");

const orbitLayers =
    document.querySelectorAll(".orbit-layer");


// =====================================================
// Create Front / Back containers
// =====================================================

const orbitBack =
    document.createElement("div");

orbitBack.className =
    "orbit-back";


const orbitFront =
    document.createElement("div");

orbitFront.className =
    "orbit-front";


heroImage.appendChild(orbitBack);
heroImage.appendChild(orbitFront);


// =====================================================
// Prepare Orbit Data
// =====================================================

const orbitData = [];


orbitLayers.forEach((layer) => {

    const icons = [
        ...layer.querySelectorAll(".tech-icon")
    ];


    /*
        Each icon gets its own
        independent self-rotation angle.
    */

    const selfAngles =
        icons.map(() => Math.random() * 360);


    orbitData.push({

        layer: layer,

        icons: icons,

        selfAngles: selfAngles

    });


    // Move icons to front container initially

    icons.forEach((icon) => {

        orbitFront.appendChild(icon);

    });

});


// =====================================================
// Front / Back Containers
// =====================================================

Object.assign(orbitBack.style, {

    position: "absolute",

    inset: "0",

    width: "100%",

    height: "100%",

    pointerEvents: "none",

    zIndex: "2",

    transformStyle: "preserve-3d"

});


Object.assign(orbitFront.style, {

    position: "absolute",

    inset: "0",

    width: "100%",

    height: "100%",

    pointerEvents: "none",

    zIndex: "20",

    transformStyle: "preserve-3d"

});


// =====================================================
// Profile Image
// =====================================================

profileImage.style.position =
    "relative";

profileImage.style.zIndex =
    "10";


// =====================================================
// Orbit Angles
// =====================================================

/*
    This controls ONLY the movement
    around the profile image.
*/

const layerAngles = [
    0,
    0,
    0
];


// =====================================================
// Animation
// =====================================================

function animateOrbit() {


    orbitData.forEach((data, layerIndex) => {


        const layer =
            data.layer;

        const icons =
            data.icons;


        // =================================================
        // Layer Settings
        // =================================================

        const direction =
            parseFloat(
                layer.dataset.direction
            ) || 1;


        const speed =
            parseFloat(
                layer.dataset.speed
            ) || 0.4;


        /*
            NEW:
            Independent self rotation speed
        */

        const selfSpeed =
            parseFloat(
                layer.dataset.selfSpeed
            ) || 1;


        const radiusX =
            parseFloat(
                layer.dataset.radiusX
            ) || 200;


        const radiusZ =
            parseFloat(
                layer.dataset.radiusZ
            ) || 140;


        // =================================================
        // Orbit Rotations
        // =================================================

        const tilt =
            parseFloat(
                layer.dataset.tilt
            ) || 20;


        const rotateX =
            parseFloat(
                layer.dataset.rotateX
            ) || 0;


        const rotateY =
            parseFloat(
                layer.dataset.rotateY
            ) || 0;


        const rotateZ =
            parseFloat(
                layer.dataset.rotateZ
            ) || 0;


        // =================================================
        // Degrees → Radians
        // =================================================

        const tiltRad =
            tilt * Math.PI / 180;


        const rotateXRad =
            rotateX * Math.PI / 180;


        const rotateYRad =
            rotateY * Math.PI / 180;


        const rotateZRad =
            rotateZ * Math.PI / 180;


        const iconCount =
            icons.length;


        if (iconCount === 0) {
            return;
        }


        // =================================================
        // Process Every Icon
        // =================================================

        icons.forEach((icon, iconIndex) => {


            // =================================================
            // ORBIT ANGLE
            //
            // This controls the movement
            // around the profile image.
            // =================================================

            const iconOffset =
                iconIndex *
                (360 / iconCount);


            const iconAngle =
                layerAngles[layerIndex] +
                iconOffset;


            const radians =
                iconAngle *
                Math.PI /
                180;


            // =================================================
            // Base Elliptical Orbit
            // =================================================

            let x =
                Math.sin(radians) *
                radiusX;


            let z =
                Math.cos(radians) *
                radiusZ;


            /*
                Small vertical movement
            */

            let y =
                Math.sin(radians * 2) *
                15;


            // =================================================
            // MAIN TILT
            // =================================================

            let x1 =
                x * Math.cos(tiltRad) -
                z * Math.sin(tiltRad);


            let z1 =
                x * Math.sin(tiltRad) +
                z * Math.cos(tiltRad);


            // =================================================
            // ROTATE X
            // =================================================

            let y2 =
                y * Math.cos(rotateXRad) -
                z1 * Math.sin(rotateXRad);


            let z2 =
                y * Math.sin(rotateXRad) +
                z1 * Math.cos(rotateXRad);


            // =================================================
            // ROTATE Y
            // =================================================

            let x2 =
                x1 * Math.cos(rotateYRad) +
                z2 * Math.sin(rotateYRad);


            let z3 =
                -x1 * Math.sin(rotateYRad) +
                z2 * Math.cos(rotateYRad);


            // =================================================
            // ROTATE Z
            // =================================================

            let x3 =
                x2 * Math.cos(rotateZRad) -
                y2 * Math.sin(rotateZRad);


            let y3 =
                x2 * Math.sin(rotateZRad) +
                y2 * Math.cos(rotateZRad);


            // =================================================
            // Final Coordinates
            // =================================================

            const finalX =
                x3;


            const finalY =
                y3;


            const finalZ =
                z3;


            // =================================================
            // DEPTH
            // =================================================

            /*
                finalZ:

                Positive  → Front
                Negative  → Back
            */


            const normalizedZ =
                Math.max(
                    0,
                    Math.min(
                        1,
                        (finalZ + radiusZ) /
                        (radiusZ * 2)
                    )
                );


            // =================================================
            // Scale
            // =================================================

            const scale =
                0.65 +
                normalizedZ *
                0.5;


            // =================================================
            // Opacity
            // =================================================

            const opacity =
                finalZ > 0
                    ? 1
                    : 0.65;


            // =================================================
            // 3D SELF ROTATION
            // =================================================

            const selfRotation =
                data.selfAngles[iconIndex];
            // Small natural 3D movement
            const selfTiltX =
                Math.sin(
                    selfRotation * Math.PI / 180
                ) * 8;


            const selfTiltZ =
                Math.cos(
                    selfRotation * Math.PI / 180
                ) * 5;

            // =================================================
            // Position
            // =================================================

            icon.style.position =
                "absolute";


            icon.style.left =
                "50%";


            icon.style.top =
                "50%";


            // =================================================
            // 3D Transform
            // =================================================

            icon.style.transform =
            `translate(-50%, -50%)` +
            ` translate3d(${finalX}px, ${finalY}px, ${finalZ}px)` +
            ` scale(${scale})` +
            ` rotateX(${selfTiltX}deg)` +
            ` rotateY(${selfRotation}deg)` +
            ` rotateZ(${selfTiltZ}deg)`;


            // =================================================
            // Opacity
            // =================================================

            icon.style.opacity =
                opacity;


            // =================================================
            // FRONT / BACK
            // =================================================

            if (finalZ > 0) {


                /*
                    Icon is in FRONT
                */

                if (
                    icon.parentElement !==
                    orbitFront
                ) {

                    orbitFront.appendChild(
                        icon
                    );

                }


            } else {


                /*
                    Icon is BEHIND
                */

                if (
                    icon.parentElement !==
                    orbitBack
                ) {

                    orbitBack.appendChild(
                        icon
                    );

                }

            }


            // =================================================
            // Glow
            // =================================================

            if (finalZ > 60) {


                icon.style.boxShadow = `
                    0 4px 15px rgba(0, 0, 0, 0.3),
                    0 0 30px rgba(56, 189, 248, 0.35),
                    0 0 60px rgba(56, 189, 248, 0.12)
                `;


                icon.style.borderColor =
                    "rgba(56, 189, 248, 0.6)";


            } else if (finalZ > 0) {


                icon.style.boxShadow = `
                    0 4px 15px rgba(0, 0, 0, 0.3),
                    0 0 20px rgba(56, 189, 248, 0.18)
                `;


                icon.style.borderColor =
                    "rgba(56, 189, 248, 0.35)";


            } else {


                icon.style.boxShadow =
                    "0 4px 15px rgba(0, 0, 0, 0.3)";


                icon.style.borderColor =
                    "rgba(56, 189, 248, 0.12)";

            }

        });


        // =================================================
        // UPDATE ORBIT ANGLE
        //
        // ONLY controls movement around image
        // =================================================

        layerAngles[layerIndex] +=
            speed *
            direction;


        // =================================================
        // UPDATE SELF ROTATION
        //
        // COMPLETELY independent
        // =================================================

        data.selfAngles =
            data.selfAngles.map(
                angle =>
                    angle + selfSpeed
            );

    });


    // =================================================
    // Next Frame
    // =================================================

    requestAnimationFrame(
        animateOrbit
    );
}


// =====================================================
// Start Orbit Animation
// =====================================================

animateOrbit();



/* =========================
   FLOATING PARTICLES
========================= */

function createParticles() {


    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if (!heroImage) {
        return;
    }


    const particleCount =
        12;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {


        const particle =
            document.createElement(
                "div"
            );


        particle.className =
            "particle";


        // =========================
        // Random Position
        // =========================

        const randomAngle =
            Math.random() *
            360;


        const randomRadius =
            180 +
            Math.random() *
            100;


        const angleRad =
            randomAngle *
            Math.PI /
            180;


        const x =
            Math.cos(angleRad) *
            randomRadius;


        const y =
            Math.sin(angleRad) *
            randomRadius;


        // =========================
        // Position
        // =========================

        particle.style.left =
            `calc(50% + ${x}px)`;


        particle.style.top =
            `calc(50% + ${y}px)`;


        // =========================
        // Random Animation
        // =========================

        particle.style.animationDelay =
            `${Math.random() * 6}s`;


        particle.style.animationDuration =
            `${4 + Math.random() * 4}s`;


        // =========================
        // Add Particle
        // =========================

        heroImage.appendChild(
            particle
        );

    }
}

// =====================================================
// Start Particles
// =====================================================

createParticles();


/* =========================
   VIDEO MODAL
========================= */

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


// Close modal with Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && videoModal.classList.contains("active")) {
        closeVideoModal();
    }
});