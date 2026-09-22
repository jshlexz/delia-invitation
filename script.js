/* =========================================
   OPEN INVITATION
========================================= */

const openButton =
    document.getElementById("openInvitation");

const openingScreen =
    document.getElementById("openingScreen");

const invitation =
    document.getElementById("invitation");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const musicIcon =
    document.getElementById("musicIcon");



/* =========================================
   OPEN INVITATION + START MUSIC
========================================= */

openButton.addEventListener(
    "click",
    async function () {


        /*
            Musik dimulai setelah pengunjung
            menekan OPEN INVITATION.
        */

        try {

            await backgroundMusic.play();

            musicButton.classList.add("active");

            musicIcon.innerText = "♫";

        }

        catch (error) {

            console.log(
                "Musik belum dapat diputar:",
                error
            );

        }


        /*
            Animasi membuka undangan
        */

        openingScreen.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        openingScreen.style.opacity = "0";

        openingScreen.style.transform =
            "scale(1.03)";


        setTimeout(function () {

            openingScreen.style.display =
                "none";

            invitation.classList.remove(
                "hidden"
            );

            window.scrollTo(
                0,
                0
            );

        }, 800);

    }
);



/* =========================================
   MUSIC PLAY / PAUSE
========================================= */

musicButton.addEventListener(
    "click",
    function () {


        if (
            backgroundMusic.paused
        ) {

            backgroundMusic.play();

            musicIcon.innerText =
                "♫";

        }

        else {

            backgroundMusic.pause();

            musicIcon.innerText =
                "▶";

        }

    }
);



/* =========================================
   COUNTDOWN
========================================= */

/*
    Acara:

    Sabtu
    26 September 2026
    10.00 WITA

    WITA = UTC+8
*/

const eventDate =
    new Date(
        "2026-09-26T10:00:00+08:00"
    ).getTime();



function updateCountdown() {


    const now =
        new Date().getTime();


    const distance =
        eventDate - now;



    /*
        Kalau acara sudah dimulai
    */

    if (
        distance <= 0
    ) {

        document.getElementById(
            "days"
        ).innerText = "00";


        document.getElementById(
            "hours"
        ).innerText = "00";


        document.getElementById(
            "minutes"
        ).innerText = "00";


        document.getElementById(
            "seconds"
        ).innerText = "00";


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
            )
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            )
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            )
            /
            1000
        );



    document.getElementById(
        "days"
    ).innerText =
        String(days).padStart(
            2,
            "0"
        );


    document.getElementById(
        "hours"
    ).innerText =
        String(hours).padStart(
            2,
            "0"
        );


    document.getElementById(
        "minutes"
    ).innerText =
        String(minutes).padStart(
            2,
            "0"
        );


    document.getElementById(
        "seconds"
    ).innerText =
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



/* =========================================
   RSVP
========================================= */

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );


const rsvpSuccess =
    document.getElementById(
        "rsvpSuccess"
    );


const guestCountElement =
    document.getElementById(
        "guestCount"
    );


const guestCountGroup =
    document.getElementById(
        "guestCountGroup"
    );


const minusGuest =
    document.getElementById(
        "minusGuest"
    );


const plusGuest =
    document.getElementById(
        "plusGuest"
    );


let guestCount = 1;



/* =========================================
   TAMBAH JUMLAH TAMU
========================================= */

plusGuest.addEventListener(
    "click",
    function () {


        /*
            Maksimal 20 orang
            untuk satu pengisian.
        */

        if (
            guestCount < 20
        ) {

            guestCount++;

            guestCountElement.innerText =
                guestCount;

        }

    }
);



/* =========================================
   KURANGI JUMLAH TAMU
========================================= */

minusGuest.addEventListener(
    "click",
    function () {


        if (
            guestCount > 1
        ) {

            guestCount--;

            guestCountElement.innerText =
                guestCount;

        }

    }
);



/* =========================================
   PILIH HADIR / TIDAK HADIR
========================================= */

const attendanceOptions =
    document.querySelectorAll(
        'input[name="attendance"]'
    );


attendanceOptions.forEach(
    function (option) {


        option.addEventListener(
            "change",
            function () {


                /*
                    Jika TIDAK HADIR
                */

                if (
                    this.value ===
                    "Tidak Hadir"
                ) {


                    guestCount = 0;


                    guestCountElement.innerText =
                        "0";


                    guestCountGroup.style.opacity =
                        "0.45";


                    minusGuest.disabled =
                        true;


                    plusGuest.disabled =
                        true;

                }


                /*
                    Jika HADIR
                */

                else {


                    guestCount = 1;


                    guestCountElement.innerText =
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



/* =========================================
   RSVP SUBMIT
========================================= */

rsvpForm.addEventListener(
    "submit",
    function (event) {


        /*
            Mencegah halaman refresh
        */

        event.preventDefault();



        const name =
            document.getElementById(
                "guestName"
            ).value.trim();



        const attendance =
            document.querySelector(
                'input[name="attendance"]:checked'
            );



        /*
            Pastikan kehadiran dipilih
        */

        if (
            !attendance
        ) {

            alert(
                "Silakan pilih konfirmasi kehadiran."
            );

            return;

        }



        const message =
            document.getElementById(
                "message"
            ).value.trim();



        /*
            DATA SEMENTARA

            Nanti pada tahap berikutnya
            akan kita sambungkan ke
            Google Sheets.

        */

        console.log({

            nama:
                name,

            kehadiran:
                attendance.value,

            jumlah:
                guestCount,

            ucapan:
                message

        });



        /*
            Tampilkan pesan sukses
        */

        rsvpForm.style.display =
            "none";


        rsvpSuccess.classList.remove(
            "hidden"
        );



        /*
            Scroll ke pesan sukses
        */

        setTimeout(
            function () {

                rsvpSuccess.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            },
            100
        );

    }
);
