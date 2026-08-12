/*
 * МАГИЧЕСКИЕ ЭФФЕКТЫ
 */


const particleContainer =
    document.getElementById("particles");


function createParticle() {

    if (!particleContainer) return;


    const particle =
        document.createElement("div");


    const size =
        Math.random() * 3 + 1;


    particle.style.position =
        "absolute";

    particle.style.width =
        `${size}px`;

    particle.style.height =
        `${size}px`;

    particle.style.borderRadius =
        "50%";

    particle.style.background =
        Math.random() > .5
            ? "#ffe7a4"
            : "#9d76d5";

    particle.style.boxShadow =
        `0 0 ${size * 5}px currentColor`;

    particle.style.left =
        `${Math.random() * 100}%`;

    particle.style.top =
        `${Math.random() * 100}%`;

    particle.style.opacity =
        Math.random() * .7 + .2;


    const duration =
        Math.random() * 8 + 6;


    particle.animate(

        [
            {
                transform:
                    "translateY(0) scale(1)",

                opacity:
                    particle.style.opacity
            },

            {
                transform:
                    `translateY(-${Math.random() * 180 + 80}px) scale(0)`,

                opacity: 0
            }
        ],

        {
            duration:
                duration * 1000,

            easing:
                "ease-out"
        }

    ).finished.then(() => {

        particle.remove();

    });


    particleContainer.appendChild(
        particle
    );
}


setInterval(
    createParticle,
    350
);


/*
 * Эффект магической вспышки
 */

function magicBurst(
    x,
    y
) {

    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const particle =
            document.createElement("div");


        particle.style.position =
            "fixed";

        particle.style.left =
            `${x}px`;

        particle.style.top =
            `${y}px`;

        particle.style.width =
            "4px";

        particle.style.height =
            "4px";

        particle.style.borderRadius =
            "50%";

        particle.style.background =
            "#ffe7a4";

        particle.style.boxShadow =
            "0 0 12px #ffe7a4";

        particle.style.pointerEvents =
            "none";

        particle.style.zIndex =
            "1000";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            Math.random() *
            120 + 40;


        document.body.appendChild(
            particle
        );


        particle.animate(

            [
                {
                    transform:
                        "translate(0,0) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            ${Math.cos(angle) * distance}px,
                            ${Math.sin(angle) * distance}px
                        ) scale(0)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    900 + Math.random() * 600,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }

        ).finished.then(() => {

            particle.remove();

        });
    }
}


/*
 * Клик создаёт магическую искру
 */

document.addEventListener(
    "click",
    event => {

        magicBurst(
            event.clientX,
            event.clientY
        );

    }
);