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
// PROJECT FILTER + LOAD MORE + SHOW LESS
// =====================================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projects =
    Array.from(
        document.querySelectorAll(".project-item")
    );

const loadMoreBtn =
    document.getElementById("loadMoreBtn");


const projectsPerClick = 3;


// Currently selected category
let currentFilter = "all";


// Number of projects currently visible
let visibleCount = projectsPerClick;



// =====================================================
// GET FILTERED PROJECTS
// =====================================================

function getFilteredProjects() {

    return projects.filter(function (project) {

        // ALL PROJECTS
        if (currentFilter === "all") {

            return true;

        }


        // SELECTED CATEGORY
        return project.classList.contains(
            currentFilter
        );

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
    // Show only allowed number
    // ---------------------------------------------

    filteredProjects.forEach(
        function (project, index) {

            if (index < visibleCount) {

                project.style.display = "";

            }

        }
    );


    // ---------------------------------------------
    // No projects found
    // ---------------------------------------------

    if (
        !loadMoreBtn ||
        filteredProjects.length === 0
    ) {

        if (loadMoreBtn) {

            loadMoreBtn.style.display = "none";

        }

        return;

    }


    // =================================================
    // MORE PROJECTS AVAILABLE
    // =================================================

    if (
        visibleCount <
        filteredProjects.length
    ) {

        loadMoreBtn.style.display =
            "inline-block";


        const remaining =
            filteredProjects.length -
            visibleCount;


        const amount =
            Math.min(
                projectsPerClick,
                remaining
            );


        loadMoreBtn.innerHTML =
            `Load More <span>(${amount} more)</span>`;


        loadMoreBtn.classList.remove(
            "show-less"
        );

    }


    // =================================================
    // ALL PROJECTS ARE VISIBLE
    // =================================================

    else {

        loadMoreBtn.style.display =
            "inline-block";


        loadMoreBtn.innerHTML =
            "Show Less";


        loadMoreBtn.classList.add(
            "show-less"
        );

    }

}



// =====================================================
// LOAD MORE / SHOW LESS BUTTON
// =====================================================

if (loadMoreBtn) {

    loadMoreBtn.addEventListener(
        "click",
        function () {


            const filteredProjects =
                getFilteredProjects();


            // -----------------------------------------
            // SHOW LESS
            // -----------------------------------------

            if (
                visibleCount >=
                filteredProjects.length
            ) {

                visibleCount =
                    projectsPerClick;


                updateProjects();

                return;

            }


            // -----------------------------------------
            // LOAD MORE
            // -----------------------------------------

            visibleCount +=
                projectsPerClick;


            updateProjects();

        }
    );

}



// =====================================================
// FILTER BUTTONS
// =====================================================

filterButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {


            // -----------------------------------------
            // Get selected filter
            // -----------------------------------------

            currentFilter =
                button.getAttribute(
                    "data-filter"
                );


            // -----------------------------------------
            // Reset to first 3 projects
            // -----------------------------------------

            visibleCount =
                projectsPerClick;


            // -----------------------------------------
            // Update active button
            // -----------------------------------------

            filterButtons.forEach(
                function (btn) {

                    btn.classList.remove(
                        "btn-primary"
                    );

                    btn.classList.add(
                        "btn-outline-warning"
                    );

                }
            );


            button.classList.remove(
                "btn-outline-warning"
            );

            button.classList.add(
                "btn-primary"
            );


            // -----------------------------------------
            // Update projects
            // -----------------------------------------

            updateProjects();

        }
    );

});



// =====================================================
// INITIAL PROJECT DISPLAY
// =====================================================

currentFilter = "all";

visibleCount =
    projectsPerClick;

updateProjects();



// =====================================================
// NAVBAR CLOSE ON MOBILE
// =====================================================

const navLinks =
    document.querySelectorAll(".nav-link");

const navbarCollapse =
    document.querySelector(".navbar-collapse");


navLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {


            if (
                navbarCollapse &&
                navbarCollapse.classList.contains(
                    "show"
                )
            ) {


                const existingCollapse =
                    bootstrap.Collapse.getInstance(
                        navbarCollapse
                    );


                if (existingCollapse) {

                    existingCollapse.hide();

                } else {

                    new bootstrap.Collapse(
                        navbarCollapse
                    ).hide();

                }

            }

        }
    );

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


            entries.forEach(
                function (entry) {


                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    function (element) {

        element.classList.add("hidden");

        observer.observe(element);

    }
);
