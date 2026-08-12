
/* =========================================================
   QUEST SYSTEM
   Мистическая библиотека
========================================================= */

function progressQuests() {

    state.quests.firstBook =
        state.books.length >= 1;

    state.quests.attention =
        state.books.includes("attention");

    state.quests.perception =
        state.books.includes("perception");

    state.quests.silence =
        state.books.includes("silence");

    state.quests.dream =
        state.books.includes("dream");

    state.quests.mirror =
        state.books.includes("mirror");
}


/* =========================================================
   ОТОБРАЖЕНИЕ КВЕСТОВ
========================================================= */

function renderQuests() {

    const list =
        document.getElementById("questList");

    if (!list) {
        return;
    }


    /*
     * ВАЖНО:
     * список создаётся внутри функции,
     * поэтому всегда получает актуальное состояние.
     */

    const quests = [

        {
            title: "Первая дверь",

            description:
                "Открой любую книгу первого круга.",

            completed:
                state.quests.firstBook
        },

        {
            title: "Научиться смотреть",

            description:
                "Прочти «Искусство Внимания».",

            completed:
                state.quests.attention
        },

        {
            title: "Увидеть отражение",

            description:
                "Прочти «Вторую Сторону Зеркала».",

            completed:
                state.quests.perception
        },

        {
            title: "Услышать тишину",

            description:
                "Прочти «Комнату Тишины».",

            completed:
                state.quests.silence
        },

        {
            title: "Найти сон",

            description:
                "Открой «Атлас Сновидений».",

            completed:
                state.quests.dream
        },

        {
            title: "Пройти коридор",

            description:
                "Открой «Зеркальный Коридор».",

            completed:
                state.quests.mirror
        }

    ];


    list.innerHTML = "";


    quests.forEach(quest => {

        const element =
            document.createElement("div");


        element.className =
            "quest " +
            (
                quest.completed
                    ? "done"
                    : ""
            );


        element.innerHTML = `

            <h3>
                ${
                    quest.completed
                        ? "✓ "
                        : ""
                }${quest.title}
            </h3>

            <p>
                ${quest.description}
            </p>

        `;


        list.appendChild(element);

    });

}




