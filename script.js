/* ==================================================
   PERSONAL GUEST NAME
================================================== */

const guestGreeting =
    document.getElementById("guestGreeting");

const guestInvitationName =
    document.getElementById("guestInvitationName");

const guestNameInput =
    document.getElementById("guestName");


/*
    Membaca nama dari URL.

    Contoh:

    https://jshlexz.github.io/delia-beach-party/?to=Willy%20Raju

    akan dibaca menjadi:

    Willy Raju
*/

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const guestNameFromURL =
    urlParams.get("to");


const cleanGuestName =
    guestNameFromURL
        ? guestNameFromURL.trim()
        : "";



/*
    Jika URL memiliki nama tamu,
    tampilkan nama pada opening.

    Jika tidak ada nama,
    opening tetap seperti undangan umum.
*/

if (cleanGuestName) {

    guestInvitationName.textContent =
        cleanGuestName;

    guestGreeting.classList.remove(
        "hidden"
    );


    /*
        Nama dari URL juga otomatis
        masuk ke kolom RSVP.
    */

    if (guestNameInput) {

        guestNameInput.value =
            cleanGuestName;

    }

}



/* ==================================================
   OPENING INVITATION
================================================== */

const openingScreen =
    document.getElementById(
        "openingScreen"
    );


const openInvitation =
    document.getElementById(
        "openInvitation"
    );


const invitation =
    document.getElementById(
        "invitation"
    );


const backgroundMusic =
    document.getElementById(
        "backgroundMusic"
    );


const musicButton =
    document.getElementById(
        "musicButton"
    );


const musicIcon =
    document.getElementById(
        "musicIcon"
    );



/* ==================================================
   OPEN INVITATION + MUSIC
================================================== */

openInvitation.addEventListener(
    "click",
    async () => {


        /*
            Membuka isi undangan.
        */

        invitation.classList.remove(
            "hidden"
        );


        /*
            Membuka kembali scroll halaman.
        */

        document.body.classList.remove(
            "locked"
        );


        /*
            Menjalankan animasi opening.
        */

        openingScreen.classList.add(
            "hide"
        );


        /*
            Kembali ke bagian paling atas
            setelah undangan dibuka.
        */

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });



        /*
            Memulai musik.

            Karena play() dijalankan
            sebagai hasil klik user,
            browser biasanya mengizinkan
            autoplay pada titik ini.
        */

        try {

            await backgroundMusic.play();


            musicIcon.textContent =
                "♫";


            musicButton.classList.add(
                "playing"
            );


        } catch (error) {

            console.log(
                "Musik belum dapat diputar otomatis:",
                error
            );

        }

    }
);



/* ==================================================
   MUSIC BUTTON
================================================== */

musicButton.addEventListener(
    "click",
    async () => {


        if (
            backgroundMusic.paused
        ) {


            try {

                await backgroundMusic.play();


                musicIcon.textContent =
                    "♫";


                musicButton.classList.add(
                    "playing"
                );


            } catch (error) {

                console.log(
                    error
                );

            }


        } else {


            backgroundMusic.pause();


            musicIcon.textContent =
                "🔇";


            musicButton.classList.remove(
                "playing"
            );

        }

    }
);



/* ==================================================
   SCROLL REVEAL
================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


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

        revealObserver.observe(
            element
        );

    }
);



/* ==================================================
   GALLERY ANIMATION
================================================== */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


const galleryObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {


                        const index =
                            [
                                ...galleryItems
                            ].indexOf(
                                entry.target
                            );


                        setTimeout(
                            () => {

                                entry.target.classList.add(
                                    "active"
                                );

                            },

                            index * 120
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

        galleryObserver.observe(
            item
        );

    }
);



/* ==================================================
   COUNTDOWN
================================================== */

const eventDate =
    new Date(
        "2026-09-26T10:00:00+08:00"
    ).getTime();



function updateCountdown() {


    const now =
        new Date().getTime();


    const distance =
        eventDate - now;


    const daysElement =
        document.getElementById(
            "days"
        );


    const hoursElement =
        document.getElementById(
            "hours"
        );


    const minutesElement =
        document.getElementById(
            "minutes"
        );


    const secondsElement =
        document.getElementById(
            "seconds"
        );



    if (
        distance <= 0
    ) {


        daysElement.textContent =
            "00";


        hoursElement.textContent =
            "00";


        minutesElement.textContent =
            "00";


        secondsElement.textContent =
            "00";


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
        String(days).padStart(
            2,
            "0"
        );


    hoursElement.textContent =
        String(hours).padStart(
            2,
            "0"
        );


    minutesElement.textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    secondsElement.textContent =
        String(seconds).padStart(
            2,
            "0"
        );

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
    document.getElementById(
        "minusGuest"
    );


const plusGuest =
    document.getElementById(
        "plusGuest"
    );


const guestCount =
    document.getElementById(
        "guestCount"
    );


const guestCountGroup =
    document.getElementById(
        "guestCountGroup"
    );


let count = 1;



minusGuest.addEventListener(
    "click",
    () => {


        if (
            count > 1
        ) {


            count--;


            guestCount.textContent =
                count;

        }

    }
);



plusGuest.addEventListener(
    "click",
    () => {


        if (
            count < 20
        ) {


            count++;


            guestCount.textContent =
                count;

        }

    }
);



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


                    guestCount.textContent =
                        "0";


                    guestCountGroup.style.opacity =
                        "0.5";


                    minusGuest.disabled =
                        true;


                    plusGuest.disabled =
                        true;

                }



                if (
                    input.value ===
                        "Hadir" &&
                    input.checked
                ) {


                    count = 1;


                    guestCount.textContent =
                        "1";


                    guestCountGroup.style.opacity =
                        "1";


                    minusGuest.disabled =
                        false;


                    plusGuest.disabled =
                        false;

                }

            }
        );

    }
);



/* ==================================================
   RSVP FORM
================================================== */

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );


const rsvpSuccess =
    document.getElementById(
        "rsvpSuccess"
    );


const rsvpResult =
    document.getElementById(
        "rsvpResult"
    );



rsvpForm.addEventListener(
    "submit",
    (event) => {


        event.preventDefault();



        const guestName =
            document.getElementById(
                "guestName"
            ).value.trim();


        const attendance =
            document.querySelector(
                'input[name="attendance"]:checked'
            )?.value;


        const message =
            document.getElementById(
                "message"
            ).value.trim();



        /*
            Data tetap ditampilkan
            di console untuk pengecekan.
        */

        console.log({

            name: guestName,

            attendance:
                attendance,

            guestCount:
                count,

            message:
                message

        });



        /*
            Menampilkan hasil RSVP
            langsung pada halaman.
        */

        if (
            attendance ===
            "Hadir"
        ) {

            rsvpResult.textContent =
                `Halo ${guestName}, terima kasih telah mengonfirmasi kehadiran.

Anda menyatakan akan hadir sebanyak ${count} orang.

Kami sangat bersukacita dan menantikan kehadiran Anda di Delia's Beach Party.`;

        } else {

            rsvpResult.textContent =
                `Halo ${guestName}, terima kasih telah memberikan konfirmasi.

Kami memahami bahwa Anda tidak dapat hadir di Delia's Beach Party.

Terima kasih atas doa dan perhatian Anda untuk Delia.`;

        }



        /*
            Form disembunyikan.
        */

        rsvpForm.classList.add(
            "hidden"
        );


        /*
            Hasil RSVP ditampilkan.
        */

        rsvpSuccess.classList.remove(
            "hidden"
        );


        /*
            Scroll sedikit agar
            hasil terlihat dengan nyaman.
        */

        setTimeout(
            () => {

                rsvpSuccess.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            },
            100
        );

    }
);
