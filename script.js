/* =========================================
   OPEN INVITATION
========================================= */

const openButton = document.getElementById("openInvitation");
const openingScreen = document.getElementById("opening-screen");
const invitation = document.getElementById("invitation");

openButton.addEventListener("click", function () {

    openingScreen.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    openingScreen.style.opacity = "0";
    openingScreen.style.transform = "scale(1.03)";

    setTimeout(function () {

        openingScreen.style.display = "none";

        invitation.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 800);

});



/* =========================================
   COUNTDOWN
========================================= */

/*
   Acara:
   Sabtu, 26 September 2026
   Pukul 10.00 WITA

   WITA = UTC+8

   Target:
   2026-09-26T10:00:00+08:00
*/

const eventDate = new Date("2026-09-26T10:00:00+08:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = eventDate - now;


    if (distance <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        return;

    }


    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );


    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");


    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);
