
// =====================================================
// PROJECT FILTER + LOAD MORE
// =====================================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = Array.from(document.querySelectorAll(".project-item"));
const loadMoreBtn = document.getElementById("loadMoreBtn");

const projectsPerClick = 3;

let currentFilter = "all";
let visibleCount = 3;


// =====================================================
// GET PROJECTS FOR CURRENT FILTER
// =====================================================

function getFilteredProjects() {

    return projects.filter(function (project) {

        if (currentFilter === "all") {
            return true;
        }

        return project.classList.contains(currentFilter);

    });

}


// =====================================================
// DISPLAY PROJECTS
// =====================================================

function updateProjects() {

    const filteredProjects = getFilteredProjects();


    // Hide every project first
    projects.forEach(function (project) {

        project.style.display = "none";

    });


    // Show ONLY projects belonging to current filter
    filteredProjects.forEach(function (project, index) {

        if (index < visibleCount) {

            project.style.display = "";

        }

    });


    // =================================================
    // LOAD MORE BUTTON
    // =================================================

    if (!loadMoreBtn) {
        return;
    }


    if (visibleCount < filteredProjects.length) {

        loadMoreBtn.style.display = "inline-block";

        const remaining =
            filteredProjects.length - visibleCount;

        const amount =
            Math.min(projectsPerClick, remaining);

        loadMoreBtn.innerHTML =
            `Load More <span>(${amount} more)</span>`;

    } else {

        loadMoreBtn.style.display = "none";

    }

}


// =====================================================
// LOAD MORE
// =====================================================

if (loadMoreBtn) {

    loadMoreBtn.addEventListener("click", function () {

        // Add 3 projects from CURRENT FILTER only
        visibleCount += projectsPerClick;

        updateProjects();

    });

}


// =====================================================
// FILTER BUTTONS
// =====================================================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Get selected category
        currentFilter =
            button.getAttribute("data-filter");


        // Reset to first 3
        visibleCount = projectsPerClick;


        // Update active button
        filterButtons.forEach(function (btn) {

            btn.classList.remove("btn-primary");

            btn.classList.add("btn-outline-warning");

        });


        button.classList.remove("btn-outline-warning");

        button.classList.add("btn-primary");


        // Display ONLY selected category
        updateProjects();

    });

});


// =====================================================
// INITIAL DISPLAY
// =====================================================

updateProjects();
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
