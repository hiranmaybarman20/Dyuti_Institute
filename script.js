/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if(menuBtn && navLinks){

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if(navLinks.classList.contains("active")){

            icon.className = "fa-solid fa-xmark";

        }else{

            icon.className = "fa-solid fa-bars";

        }

    });


    /* CLOSE MENU AFTER CLICK */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuBtn.querySelector("i").className =
            "fa-solid fa-bars";

        });

    });

}


/* =========================================================
   NAVBAR SCROLL
========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
document.querySelectorAll(".reveal");

const revealObserver =
new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("active");

            revealObserver.unobserve(entry.target);

        }

    });

},{
    threshold:.12
});


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   COUNTER
========================================================= */

const counters =
document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters(){

    if(counterStarted) return;

    counterStarted = true;

    counters.forEach(counter => {

        const target =
        Number(counter.dataset.target);

        let count = 0;

        const increment =
        Math.max(1,Math.ceil(target / 40));

        const update = () => {

            count += increment;

            if(count >= target){

                counter.innerText = target + "+";

            }else{

                counter.innerText = count;

                requestAnimationFrame(update);

            }

        };

        update();

    });

}


const statsSection =
document.querySelector(".stats");

if(statsSection){

    const statsObserver =
    new IntersectionObserver((entries) => {

        if(entries[0].isIntersecting){

            startCounters();

            statsObserver.disconnect();

        }

    },{
        threshold:.3
    });

    statsObserver.observe(statsSection);

}


/* =========================================================
   ADVERTISEMENT VIDEO POPUP
========================================================= */

const adPopup =
document.getElementById("adPopup");

const adClose =
document.getElementById("adClose");

const adOverlay =
document.getElementById("adOverlay");

const adVideo =
document.getElementById("adVideo");

const adEnrollBtn =
document.getElementById("adEnrollBtn");


/*
   SHOW POPUP AFTER PAGE LOAD
*/

window.addEventListener("load", () => {

    setTimeout(() => {

        if(adPopup){

            adPopup.classList.add("active");

            if(adVideo){

                adVideo.currentTime = 0;

                const playPromise =
                adVideo.play();

                if(playPromise !== undefined){

                    playPromise.catch(() => {

                        console.log(
                            "Autoplay was blocked by browser."
                        );

                    });

                }

            }

        }

    },1200);

});


/*
   CLOSE POPUP
*/

function closeAdvertisement(){

    if(adPopup){

        adPopup.classList.remove("active");

    }

    if(adVideo){

        adVideo.pause();

    }

}


if(adClose){

    adClose.addEventListener(
        "click",
        closeAdvertisement
    );

}


if(adOverlay){

    adOverlay.addEventListener(
        "click",
        closeAdvertisement
    );

}


/*
   ESC KEY
*/

document.addEventListener("keydown",(event)=>{

    if(event.key === "Escape"){

        closeAdvertisement();

    }

});


/*
   ENROLL BUTTON
*/

if(adEnrollBtn){

    adEnrollBtn.addEventListener("click",()=>{

        closeAdvertisement();

    });

}


/* =========================================================
   FORM → WHATSAPP
========================================================= */

const form =
document.getElementById("admissionForm");

if(form){

    form.addEventListener("submit",(e)=>{

        e.preventDefault();


        const name =
        document.getElementById("name").value.trim();

        const phone =
        document.getElementById("phone").value.trim();

        const course =
        document.getElementById("course").value;

        const city =
        document.getElementById("city").value.trim();

        const message =
        document.getElementById("message").value.trim();


        const whatsappMessage =
`Hello Dyuti Institute,

I want to enquire about admission.

Name: ${name}
Phone: ${phone}
Course: ${course}
City: ${city}

Message:
${message}`;


        const whatsappURL =
        "https://wa.me/918597656655?text=" +
        encodeURIComponent(whatsappMessage);


        window.open(
            whatsappURL,
            "_blank"
        );

    });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
document.getElementById("year");

if(yearElement){

    yearElement.innerText =
    new Date().getFullYear();

}


/* =========================================================
   PREVENT BODY SCROLL WHEN AD IS OPEN
========================================================= */

function updateBodyScroll(){

    if(
        adPopup &&
        adPopup.classList.contains("active")
    ){

        document.body.style.overflow = "hidden";

    }else{

        document.body.style.overflow = "";

    }

}


if(adPopup){

    const observer =
    new MutationObserver(updateBodyScroll);

    observer.observe(adPopup,{
        attributes:true,
        attributeFilter:["class"]
    });

}
