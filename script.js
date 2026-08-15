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
            currentText.substring(0, charIndex--);

    } else {

        typingElement.textContent =
            currentText.substring(0, charIndex++);

    }


    let speed = isDeleting ? 50 : 100;


    // Finished typing
    if (!isDeleting && charIndex === currentText.length) {

        speed = 1500;
        isDeleting = true;

    }


    // Finished deleting
    else if (isDeleting && charIndex === 0) {

        isDeleting = false;

        textIndex++;

        if (textIndex === textArray.length) {
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


// Number of projects shown per click
const projectsPerClick = 3;


// Current selected filter
let currentFilter = "all";


// Number of projects currently visible
let visibleCount = projectsPerClick;



// =====================================================
// GET FILTERED PROJECTS
// =====================================================

function getFilteredProjects() {

    return projects.filter(function (project) {

        // Show every project
        if (currentFilter === "all") {
            return true;
        }

        // Show only matching category
        return project.classList.contains(currentFilter);

    });

}



// =====================================================
// UPDATE PROJECT DISPLAY
// =====================================================

function updateProjects() {

    const filteredProjects =
        getFilteredProjects();


    // ---------------------------------------------
    // Hide ALL projects first
    // ---------------------------------------------

    projects.forEach(function (project) {

        project.style.display = "none";

    });


    // ---------------------------------------------
    // Show only the allowed number
    // ---------------------------------------------

    filteredProjects.forEach(function (project, index) {

        if (index < visibleCount) {

            // Empty display lets Bootstrap
            // control the grid layout
            project.style.display = "";

        }

    });


    // ---------------------------------------------
    // Update Load More button
    // ---------------------------------------------

    if (!loadMoreBtn) return;


    // More projects available
    if (visibleCount < filteredProjects.length) {

        loadMoreBtn.style.display = "inline-block";


        const remaining =
            filteredProjects.length - visibleCount;


        const amount =
            Math.min(projectsPerClick, remaining);


        loadMoreBtn.innerHTML =
            `Load More <span>(${amount} more)</span>`;

    }


    // All projects are visible
    else {

        loadMoreBtn.style.display = "none";

    }

}



// =====================================================
// LOAD MORE BUTTON
// =====================================================

if (loadMoreBtn) {

    loadMoreBtn.addEventListener("click", function () {

        // Add 3 more
        visibleCount += projectsPerClick;


        // Refresh projects
        updateProjects();

    });

}



// =====================================================
// PROJECT FILTER BUTTONS
// =====================================================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {


        // ---------------------------------------------
        // Get selected category
        // ---------------------------------------------

        currentFilter =
            button.getAttribute("data-filter");


        // ---------------------------------------------
        // Reset to first 3 projects
        // ---------------------------------------------

        visibleCount =
            projectsPerClick;


        // ---------------------------------------------
        // Update active button
        // ---------------------------------------------

        filterButtons.forEach(function (btn) {

            btn.classList.remove("btn-primary");

            btn.classList.add("btn-outline-warning");

        });


        button.classList.remove("btn-outline-warning");

        button.classList.add("btn-primary");


        // ---------------------------------------------
        // Update projects
        // ---------------------------------------------

        updateProjects();


        // ---------------------------------------------
        // Scroll to projects section
        // ---------------------------------------------

        const projectsSection =
            document.getElementById("projects");


        if (projectsSection) {

            projectsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});



// =====================================================
// INITIAL PROJECT DISPLAY
// =====================================================

// Start with first 3 projects
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

            new bootstrap.Collapse(
                navbarCollapse
            ).hide();

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
