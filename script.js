/* ========================================= */
/* ELEMENTS */
/* ========================================= */

const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");

const openInvitation = document.getElementById("openInvitation");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");


/* ========================================= */
/* OPEN INVITATION */
/* ========================================= */

openInvitation.addEventListener("click", async () => {

    opening.style.transition = "opacity 0.8s ease";

    opening.style.opacity = "0";

    setTimeout(() => {

        opening.style.display = "none";

        invitation.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 800);


    try {

        await backgroundMusic.play();

        musicButton.innerHTML = "♫";

    } catch (error) {

        console.log("Music autoplay tidak dapat dijalankan:", error);

    }

});


/* ========================================= */
/* MUSIC BUTTON */
/* ========================================= */

musicButton.addEventListener("click", async () => {

    if (backgroundMusic.paused) {

        try {

            await backgroundMusic.play();

            musicButton.innerHTML = "♫";

        } catch (error) {

            console.log("Music gagal diputar:", error);

        }

    } else {

        backgroundMusic.pause();

        musicButton.innerHTML = "♪";

    }

});


/* ========================================= */
/* SCROLL REVEAL */
/* ========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ========================================= */
/* COUNTDOWN */
/* ========================================= */

const eventDate = new Date(
    "2026-09-26T10:00:00+08:00"
).getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = eventDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* ========================================= */
/* RSVP */
/* ========================================= */

const rsvpForm = document.getElementById("rsvpForm");

const minusGuest = document.getElementById("minusGuest");
const plusGuest = document.getElementById("plusGuest");
const guestCountElement = document.getElementById("guestCount");

let guestCount = 1;


/* ========================================= */
/* PLUS GUEST */
/* ========================================= */

plusGuest.addEventListener("click", () => {

    if (guestCount < 20) {

        guestCount++;

        guestCountElement.textContent = guestCount;

    }

});


/* ========================================= */
/* MINUS GUEST */
/* ========================================= */

minusGuest.addEventListener("click", () => {

    if (guestCount > 1) {

        guestCount--;

        guestCountElement.textContent = guestCount;

    }

});


/* ========================================= */
/* ATTENDANCE */
/* ========================================= */

const attendanceInputs = document.querySelectorAll(
    'input[name="attendance"]'
);


attendanceInputs.forEach((input) => {

    input.addEventListener("change", () => {

        if (input.value === "Tidak Hadir" && input.checked) {

            guestCount = 0;

            guestCountElement.textContent = "0";

            minusGuest.disabled = true;
            plusGuest.disabled = true;

        }


        if (input.value === "Hadir" && input.checked) {

            guestCount = 1;

            guestCountElement.textContent = "1";

            minusGuest.disabled = false;
            plusGuest.disabled = false;

        }

    });

});


/* ========================================= */
/* RSVP SUBMIT */
/* ========================================= */

rsvpForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const guestName =
        document.getElementById("guestName").value.trim();

    const attendance =
        document.querySelector(
            'input[name="attendance"]:checked'
        ).value;

    const message =
        document.getElementById("message").value.trim();


    const rsvpData = {

        nama: guestName,

        kehadiran: attendance,

        jumlahOrang: guestCount,

        pesan: message

    };


    console.log("RSVP DELIA:", rsvpData);


    alert(
        "Terima kasih, " +
        guestName +
        "! Konfirmasi Anda sudah diterima."
    );


    rsvpForm.reset();


    guestCount = 1;

    guestCountElement.textContent = "1";

    minusGuest.disabled = false;
    plusGuest.disabled = false;

});
