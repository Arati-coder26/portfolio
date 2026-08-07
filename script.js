// ===============================
// Typing Animation
// ===============================

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


function typeEffect(){

    if(!typingElement) return;


    const currentText = textArray[textIndex];


    if(isDeleting){

        typingElement.textContent =
        currentText.substring(0,charIndex--);

    }
    else{

        typingElement.textContent =
        currentText.substring(0,charIndex++);

    }



    let speed = isDeleting ? 50 : 100;



    if(!isDeleting && charIndex === currentText.length){

        speed = 1500;
        isDeleting = true;

    }


    else if(isDeleting && charIndex === 0){

        isDeleting = false;

        textIndex++;

        if(textIndex === textArray.length){

            textIndex = 0;

        }

        speed = 500;

    }



    setTimeout(typeEffect,speed);

}


typeEffect();





// ===============================
// Project Filter
// ===============================


const filterButtons = document.querySelectorAll(".filter-btn");

const projects = document.querySelectorAll(".project-item");



filterButtons.forEach(button => {


    button.addEventListener("click",()=>{


        const filter = button.getAttribute("data-filter");



        filterButtons.forEach(btn=>{

            btn.classList.remove("btn-primary");

            btn.classList.add("btn-outline-warning");

        });



        button.classList.remove("btn-outline-warning");

        button.classList.add("btn-primary");




        projects.forEach(project=>{


            if(filter === "all" ||
               project.classList.contains(filter)){


                project.style.display="block";


            }

            else{


                project.style.display="none";


            }


        });


    });


});






// ===============================
// Navbar Close On Mobile
// ===============================


const navLinks = document.querySelectorAll(".nav-link");

const navbarCollapse = document.querySelector(".navbar-collapse");



navLinks.forEach(link=>{


    link.addEventListener("click",()=>{


        if(navbarCollapse.classList.contains("show")){


            new bootstrap.Collapse(navbarCollapse).hide();


        }


    });


});







// ===============================
// Scroll Reveal Animation
// ===============================


const revealElements =
document.querySelectorAll(
".card, .project-card, .section h2"
);



const observer = new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){


        entry.target.classList.add("show");


    }


});


},
{
    threshold:0.15
});



revealElements.forEach(element=>{


    element.classList.add("hidden");

    observer.observe(element);


});
