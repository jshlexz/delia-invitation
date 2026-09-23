/* ==================================================
   DELIA'S BEACH PARTY
   JAVASCRIPT
================================================== */


document.addEventListener("DOMContentLoaded", function () {


    /* ==================================================
       ELEMENTS
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

    if (openInvitation) {

        openInvitation.addEventListener(
            "click",
            function () {


                /*
                 * Musik mulai setelah user
                 * melakukan klik.
                 */

                if (backgroundMusic) {

                    backgroundMusic.volume = 0.45;

                    backgroundMusic
                        .play()
                        .then(function () {

                            musicButton.classList.add("playing");

                            musicIcon.textContent = "♫";

                        })
                        .catch(function (error) {

                            console.log(
                                "Musik belum dapat diputar:",
                                error
                            );

                        });

                }


                /*
                 * Tampilkan invitation
                 */

                invitation.classList.remove("hidden");


                /*
                 * Hilangkan opening
                 */

                setTimeout(function () {

                    openingScreen.classList.add("hide");

                }, 100);


                /*
                 * Scroll ke awal invitation
                 */

                setTimeout(function () {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }, 500);


            }
        );

    }



    /* ==================================================
       MUSIC BUTTON
    ================================================== */

    if (musicButton) {

        musicButton.addEventListener(
            "click",
            function () {


                if (!backgroundMusic) {
                    return;
                }


                if (backgroundMusic.paused) {


                    backgroundMusic
                        .play()
                        .then(function () {

                            musicButton.classList.add(
                                "playing"
                            );

                            musicIcon.textContent = "♫";

                        })
                        .catch(function (error) {

                            console.log(error);

                        });


                } else {


                    backgroundMusic.pause();

                    musicButton.classList.remove(
                        "playing"
                    );

                    musicIcon.textContent = "♪";

                }

            }
        );

    }



    /* ==================================================
       SCROLL REVEAL
    ================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            function (entries) {


                entries.forEach(function (entry) {


                    if (entry.isIntersecting) {


                        entry.target.classList.add(
                            "active"
                        );


                        /*
                         * Setelah muncul,
                         * observer tidak perlu
                         * mengawasi lagi.
                         */

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });


            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });



    /* ==================================================
       GALLERY ANIMATION
    ================================================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    const galleryObserver =
        new IntersectionObserver(
            function (entries) {


                entries.forEach(function (entry) {


                    if (entry.isIntersecting) {


                        const item =
                            entry.target;


                        /*
                         * Tambahkan active
                         * dengan sedikit delay
                         * berdasarkan posisi.
                         */

                        const index =
                            Array.from(
                                galleryItems
                            ).indexOf(item);


                        setTimeout(
                            function () {

                                item.classList.add(
                                    "active"
                                );

                            },
                            index * 120
                        );


                        galleryObserver.unobserve(
                            item
                        );

                    }

                });


            },
            {
                threshold: 0.15
            }
        );


    galleryItems.forEach(function (item) {

        galleryObserver.observe(item);

    });



    /* ==================================================
       COUNTDOWN
    ================================================== */

    const targetDate =
        new Date(
            "2026-09-26T10:00:00+08:00"
        ).getTime();


    function updateCountdown() {


        const now =
            new Date().getTime();


        const distance =
            targetDate - now;


        const days =
            document.getElementById("days");

        const hours =
            document.getElementById("hours");

        const minutes =
            document.getElementById("minutes");

        const seconds =
            document.getElementById("seconds");


        if (distance <= 0) {


            days.textContent = "00";

            hours.textContent = "00";

            minutes.textContent = "00";

            seconds.textContent = "00";

            return;

        }


        const dayValue =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const hourValue =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const minuteValue =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const secondValue =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );


        days.textContent =
            String(dayValue).padStart(2, "0");


        hours.textContent =
            String(hourValue).padStart(2, "0");


        minutes.textContent =
            String(minuteValue).padStart(2, "0");


        seconds.textContent =
            String(secondValue).padStart(2, "0");

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );



    /* ==================================================
       RSVP
    ================================================== */

    const rsvpForm =
        document.getElementById("rsvpForm");


    const guestCount =
        document.getElementById("guestCount");


    const minusGuest =
        document.getElementById("minusGuest");


    const plusGuest =
        document.getElementById("plusGuest");


    const guestCountGroup =
        document.getElementById(
            "guestCountGroup"
        );


    const rsvpSuccess =
        document.getElementById(
            "rsvpSuccess"
        );


    let numberOfGuests = 1;



    /* ==================================================
       PLUS GUEST
    ================================================== */

    if (plusGuest) {

        plusGuest.addEventListener(
            "click",
            function () {


                if (numberOfGuests < 20) {

                    numberOfGuests++;

                    guestCount.textContent =
                        numberOfGuests;

                }

            }
        );

    }



    /* ==================================================
       MINUS GUEST
    ================================================== */

    if (minusGuest) {

        minusGuest.addEventListener(
            "click",
            function () {


                if (numberOfGuests > 1) {

                    numberOfGuests--;

                    guestCount.textContent =
                        numberOfGuests;

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
        function (input) {


            input.addEventListener(
                "change",
                function () {


                    if (
                        this.value ===
                        "Tidak Hadir"
                    ) {


                        numberOfGuests = 0;

                        guestCount.textContent =
                            "0";


                        guestCountGroup.style.opacity =
                            "0.45";


                        guestCountGroup.style.pointerEvents =
                            "none";


                    } else {


                        numberOfGuests = 1;

                        guestCount.textContent =
                            "1";


                        guestCountGroup.style.opacity =
                            "1";


                        guestCountGroup.style.pointerEvents =
                            "auto";

                    }

                }
            );

        }
    );



    /* ==================================================
       RSVP SUBMIT
    ================================================== */

    if (rsvpForm) {

        rsvpForm.addEventListener(
            "submit",
            function (event) {


                event.preventDefault();


                const name =
                    document.getElementById(
                        "guestName"
                    ).value.trim();


                const attendance =
                    document.querySelector(
                        'input[name="attendance"]:checked'
                    );


                const message =
                    document.getElementById(
                        "message"
                    ).value.trim();


                if (!attendance) {

                    alert(
                        "Mohon pilih konfirmasi kehadiran."
                    );

                    return;

                }


                /*
                 * Data untuk sementara
                 * ditampilkan di console.
                 *
                 * Nanti bisa kita sambungkan
                 * ke Google Sheets.
                 */

                const rsvpData = {

                    nama: name,

                    kehadiran:
                        attendance.value,

                    jumlah:
                        numberOfGuests,

                    pesan:
                        message,

                    waktu:
                        new Date().toLocaleString(
                            "id-ID"
                        )

                };


                console.log(
                    "DATA RSVP:",
                    rsvpData
                );


                /*
                 * Sembunyikan form
                 */

                rsvpForm.classList.add(
                    "hidden"
                );


                /*
                 * Tampilkan success
                 */

                rsvpSuccess.classList.remove(
                    "hidden"
                );


                /*
                 * Scroll sedikit ke success
                 */

                setTimeout(
                    function () {

                        rsvpSuccess.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    },
                    200
                );

            }
        );

    }


});
