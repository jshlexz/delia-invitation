/* ==================================================
   DELIA'S BEACH PARTY
   MAIN JAVASCRIPT
================================================== */


/* ==================================================
   PERSONAL GUEST NAME
================================================== */

const guestInvitationName =
    document.getElementById("guestInvitationName");

const guestNameInput =
    document.getElementById("guestName");

const urlParams =
    new URLSearchParams(window.location.search);

const guestName =
    urlParams.get("to");


/* ==================================================
   TAMPILKAN NAMA PERSONAL
================================================== */

if (
    guestName &&
    guestName.trim() !== ""
) {

    const decodedGuestName =
        guestName.trim();

    if (guestInvitationName) {

        guestInvitationName.textContent =
            decodedGuestName;

        guestInvitationName.classList.remove(
            "hidden"
        );

    }

    if (guestNameInput) {

        guestNameInput.value =
            decodedGuestName;

    }

}


/* ==================================================
   OPENING INVITATION
================================================== */

const openingScreen =
    document.getElementById("openingScreen");

const openInvitation =
    document.getElementById("openInvitation");

const invitation =
    document.getElementById("invitation");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const musicIcon =
    document.getElementById("musicIcon");


/* ==================================================
   OPEN INVITATION
================================================== */

if (
    openInvitation &&
    openingScreen &&
    invitation
) {

    openInvitation.addEventListener(
        "click",
        async () => {

            openingScreen.style.opacity = "0";
            openingScreen.style.visibility = "hidden";

            invitation.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });


            /* ==============================
               PLAY MUSIC
            ============================== */

            if (backgroundMusic) {

                try {

                    await backgroundMusic.play();

                    if (musicIcon) {
                        musicIcon.textContent = "♫";
                    }

                    if (musicButton) {
                        musicButton.classList.add(
                            "playing"
                        );
                    }

                } catch (error) {

                    console.log(
                        "Musik belum dapat diputar otomatis:",
                        error
                    );

                }

            }

        }
    );

}


/* ==================================================
   MUSIC BUTTON
================================================== */

if (
    musicButton &&
    backgroundMusic
) {

    musicButton.addEventListener(
        "click",
        async () => {

            if (
                backgroundMusic.paused
            ) {

                try {

                    await backgroundMusic.play();

                    if (musicIcon) {
                        musicIcon.textContent = "♫";
                    }

                    musicButton.classList.add(
                        "playing"
                    );

                } catch (error) {

                    console.log(
                        "Musik gagal diputar:",
                        error
                    );

                }

            } else {

                backgroundMusic.pause();

                if (musicIcon) {
                    musicIcon.textContent = "🔇";
                }

                musicButton.classList.remove(
                    "playing"
                );

            }

        }
    );

}


/* ==================================================
   SCROLL REVEAL
================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(element);

        }
    );

}


/* ==================================================
   GALLERY ANIMATION
================================================== */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


if (
    galleryItems.length > 0 &&
    "IntersectionObserver" in window
) {

    const galleryObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            const index =
                                Array.from(
                                    galleryItems
                                ).indexOf(
                                    entry.target
                                );


                            setTimeout(
                                () => {

                                    entry.target.classList.add(
                                        "active"
                                    );

                                },
                                Math.max(
                                    index,
                                    0
                                ) * 120
                            );


                            galleryObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );


    galleryItems.forEach(
        (item) => {

            galleryObserver.observe(item);

        }
    );

}


/* ==================================================
   COUNTDOWN
================================================== */

const eventDate =
    new Date(
        "2026-09-26T10:00:00+08:00"
    ).getTime();


const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        eventDate - now;


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    if (distance <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* ==================================================
   RSVP GUEST COUNTER
================================================== */

const minusGuest =
    document.getElementById("minusGuest");

const plusGuest =
    document.getElementById("plusGuest");

const guestCount =
    document.getElementById("guestCount");

const guestCountGroup =
    document.getElementById("guestCountGroup");


let count = 1;


/* ==================================================
   MINUS GUEST
================================================== */

if (
    minusGuest &&
    guestCount
) {

    minusGuest.addEventListener(
        "click",
        () => {

            if (count > 1) {

                count--;

                guestCount.textContent =
                    count;

            }

        }
    );

}


/* ==================================================
   PLUS GUEST
================================================== */

if (
    plusGuest &&
    guestCount
) {

    plusGuest.addEventListener(
        "click",
        () => {

            if (count < 20) {

                count++;

                guestCount.textContent =
                    count;

            }

        }
    );

}


/* ==================================================
   ATTENDANCE
================================================== */

const attendanceInputs =
    document.querySelectorAll(
        'input[name="attendance"]'
    );


attendanceInputs.forEach(
    (input) => {

        input.addEventListener(
            "change",
            () => {

                if (
                    input.value ===
                    "Tidak Hadir" &&
                    input.checked
                ) {

                    count = 0;


                    if (guestCount) {

                        guestCount.textContent =
                            "0";

                    }


                    if (guestCountGroup) {

                        guestCountGroup.style.opacity =
                            "0.5";

                    }


                    if (minusGuest) {

                        minusGuest.disabled =
                            true;

                    }


                    if (plusGuest) {

                        plusGuest.disabled =
                            true;

                    }

                }


                if (
                    input.value ===
                    "Hadir" &&
                    input.checked
                ) {

                    count = 1;


                    if (guestCount) {

                        guestCount.textContent =
                            "1";

                    }


                    if (guestCountGroup) {

                        guestCountGroup.style.opacity =
                            "1";

                    }


                    if (minusGuest) {

                        minusGuest.disabled =
                            false;

                    }


                    if (plusGuest) {

                        plusGuest.disabled =
                            false;

                    }

                }

            }
        );

    }
);


/* ==================================================
   RSVP FORM
================================================== */

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpSuccess =
    document.getElementById("rsvpSuccess");


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const currentGuestNameElement =
                document.getElementById(
                    "guestName"
                );


            const messageElement =
                document.getElementById(
                    "message"
                );


            const attendanceElement =
                document.querySelector(
                    'input[name="attendance"]:checked'
                );


            const currentGuestName =
                currentGuestNameElement
                    ? currentGuestNameElement.value
                    : "";


            const attendance =
                attendanceElement
                    ? attendanceElement.value
                    : "";


            const message =
                messageElement
                    ? messageElement.value
                    : "";


            console.log({

                name:
                    currentGuestName,

                attendance:
                    attendance,

                guestCount:
                    count,

                message:
                    message

            });


            rsvpForm.classList.add(
                "hidden"
            );


            if (rsvpSuccess) {

                rsvpSuccess.classList.remove(
                    "hidden"
                );

            }

        }
    );

}
