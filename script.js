// =====================================================
// TYPING ANIMATION
// =====================================================

const typingElement = document.getElementById("typing");

const textArray = [
    "Full Stack Developer",
    "E-commerce Developer",
    "Laravel & Vue Developer",
    "React Developer",
    "API & Backend Developer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;


function typeEffect() {

    if (!typingElement) return;

    const currentText = textArray[textIndex];

    if (isDeleting) {

        typingElement.textContent =
            currentText.substring(0, charIndex);

        charIndex--;

    } else {

        typingElement.textContent =
            currentText.substring(0, charIndex);

        charIndex++;

    }


    let speed = isDeleting ? 50 : 100;


    // Finished typing
    if (!isDeleting && charIndex > currentText.length) {

        charIndex = currentText.length;
        isDeleting = true;
        speed = 1500;

    }


    // Finished deleting
    else if (isDeleting && charIndex < 0) {

        charIndex = 0;
        isDeleting = false;

        textIndex++;

        if (textIndex >= textArray.length) {
            textIndex = 0;
        }

        speed = 500;

    }


    setTimeout(typeEffect, speed);

}


typeEffect();



// =====================================================
// PROJECT FILTER + LOAD MORE
// =====================================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projects =
    Array.from(document.querySelectorAll(".project-item"));

const loadMoreBtn =
    document.getElementById("loadMoreBtn");


// Number of projects revealed each time
const projectsPerClick = 3;


// Currently selected filter
let currentFilter = "all";


// Number currently visible
let visibleCount = 3;



// =====================================================
// GET CURRENT FILTERED PROJECTS
// =====================================================

function getFilteredProjects() {

    return projects.filter(function (project) {

        // ALL
        if (currentFilter === "all") {
            return true;
        }


        // CATEGORY
        return project.classList.contains(currentFilter);

    });

}



// =====================================================
// UPDATE PROJECTS
// =====================================================

function updateProjects() {

    const filteredProjects =
        getFilteredProjects();


    // ---------------------------------------------
    // Hide every project
    // ---------------------------------------------

    projects.forEach(function (project) {

        project.style.display = "none";

    });


    // ---------------------------------------------
    // Show ONLY current category
    // ---------------------------------------------

    filteredProjects.forEach(function (project, index) {

        if (index < visibleCount) {

            project.style.display = "";

        }

    });


    // ---------------------------------------------
    // Load More button
    // ---------------------------------------------

    if (!loadMoreBtn) {
        return;
    }


    // More projects available
    if (visibleCount < filteredProjects.length) {

        loadMoreBtn.style.display = "inline-block";


        const remaining =
            filteredProjects.length - visibleCount;


        const amount =
            Math.min(
                projectsPerClick,
                remaining
            );


        loadMoreBtn.innerHTML =
            `Load More <span>(${amount} more)</span>`;

    }

    // Nothing more to show
    else {

        loadMoreBtn.style.display = "none";

    }

}



// =====================================================
// LOAD MORE BUTTON
// =====================================================

if (loadMoreBtn) {

    loadMoreBtn.addEventListener("click", function () {


        // IMPORTANT:
        // This only increases the number of projects
        // inside the CURRENT FILTER.

        visibleCount += projectsPerClick;


        updateProjects();

    });

}



// =====================================================
// FILTER BUTTONS
// =====================================================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {


        // ---------------------------------------------
        // Get selected filter
        // ---------------------------------------------

        const selectedFilter =
            button.getAttribute("data-filter");


        // ---------------------------------------------
        // Set current filter
        // ---------------------------------------------

        currentFilter = selectedFilter;


        // ---------------------------------------------
        // RESET TO FIRST 3
        // ---------------------------------------------

        visibleCount = projectsPerClick;


        // ---------------------------------------------
        // Update button appearance
        // ---------------------------------------------

        filterButtons.forEach(function (btn) {

            btn.classList.remove("btn-primary");

            btn.classList.add("btn-outline-primary");

        });


        button.classList.remove("btn-outline-primary");

        button.classList.add("btn-primary");


        // ---------------------------------------------
        // Update projects
        // ---------------------------------------------

        updateProjects();

    });

});



// =====================================================
// INITIAL STATE
// =====================================================

currentFilter = "all";

visibleCount = projectsPerClick;

updateProjects();



// =====================================================
// NAVBAR CLOSE ON MOBILE
// =====================================================

const navLinks =
    document.querySelectorAll(".nav-link");

const navbarCollapse =
    document.querySelector(".navbar-collapse");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (
            navbarCollapse &&
            navbarCollapse.classList.contains("show")
        ) {

            const bsCollapse =
                bootstrap.Collapse.getInstance(
                    navbarCollapse
                );

            if (bsCollapse) {

                bsCollapse.hide();

            } else {

                new bootstrap.Collapse(
                    navbarCollapse
                ).hide();

            }

        }

    });

});



// =====================================================
// SCROLL REVEAL ANIMATION
// =====================================================

const revealElements =
    document.querySelectorAll(
        ".card, .project-card, .section h2"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(function (element) {

    element.classList.add("hidden");

    observer.observe(element);

});
