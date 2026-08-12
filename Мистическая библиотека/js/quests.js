
/* =========================================================
   QUEST SYSTEM
   Мистическая библиотека
========================================================= */


/* =========================================================
   ПРОГРЕСС КВЕСТОВ
========================================================= */

/*
 * Проверяет состояние игры и обновляет
 * прогресс всех квестов.
 *
 * Важно:
 * quests.js отвечает за правила квестов.
 * state.js отвечает только за хранение состояния.
 *
 * Сохранение здесь НЕ вызывается.
 * Это делает код, который изменил state.
 */

function progressQuests() {

    state.quests.firstBook =
        state.books.length >= 1;


    state.quests.attention =
        state.books.includes(
            "attention"
        );


    state.quests.perception =
        state.books.includes(
            "perception"
        );


    state.quests.silence =
        state.books.includes(
            "silence"
        );


    state.quests.dream =
        state.books.includes(
            "dream"
        );


    state.quests.mirror =
        state.books.includes(
            "mirror"
        );

}


/* =========================================================
   ОТОБРАЖЕНИЕ КВЕСТОВ
========================================================= */

function renderQuests() {

    const list =
        document.getElementById(
            "questList"
        );


    if (!list) {
        return;
    }


    const quests = [

        [
            "Первая дверь",
            "Открой любую книгу первого круга.",
            state.quests.firstBook
        ],

        [
            "Научиться смотреть",
            "Прочти «Искусство Внимания».",
            state.quests.attention
        ],

        [
            "Увидеть отражение",
            "Прочти «Вторую Сторону Зеркала».",
            state.quests.perception
        ],

        [
            "Услышать тишину",
            "Прочти «Комнату Тишины».",
            state.quests.silence
        ],

        [
            "Найти сон",
            "Открой «Атлас Сновидений».",
            state.quests.dream
        ],

        [
            "Пройти коридор",
            "Открой «Зеркальный Коридор».",
            state.quests.mirror
        ]

    ];


    list.innerHTML = "";


    quests.forEach(
        quest => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "quest " +
                (
                    quest[2]
                        ? "done"
                        : ""
                );


            element.innerHTML = `

                <h3>
                    ${
                        quest[2]
                            ? "✓ "
                            : ""
                    }${quest[0]}
                </h3>

                <p>
                    ${quest[1]}
                </p>

            `;


            list.appendChild(
                element
            );

        }
    );

}

