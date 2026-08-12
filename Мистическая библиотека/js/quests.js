
/* =========================================================
   QUEST SYSTEM
   Мистическая библиотека
========================================================= */


/* =========================================================
   ПРОГРЕСС КВЕСТОВ
========================================================= */

/*
 * book оставлен в аргументах специально.
 *
 * Сейчас books.js вызывает:
 *
 * progressQuests(book);
 *
 * Поэтому мы сохраняем совместимость
 * с текущим books.js и ничего там пока
 * не ломаем.
 */

function progressQuests(book) {

    /*
     * Первая дверь:
     * игрок прочитал хотя бы одну книгу.
     */

    state.quests.firstBook =
        state.books.length >= 1;


    /*
     * Научиться смотреть
     */

    state.quests.attention =
        state.books.includes("attention");


    /*
     * Увидеть отражение
     */

    state.quests.perception =
        state.books.includes("perception");


    /*
     * Услышать тишину
     */

    state.quests.silence =
        state.books.includes("silence");


    /*
     * Найти сон
     */

    state.quests.dream =
        state.books.includes("dream");


    /*
     * Пройти коридор
     */

    state.quests.mirror =
        state.books.includes("mirror");

}


/* =========================================================
   ОТОБРАЖЕНИЕ КВЕСТОВ
========================================================= */

function renderQuests() {

    const list =
        document.getElementById(
            "questList"
        );


    /*
     * Панель квестов может ещё отсутствовать
     * в DOM в момент вызова.
     *
     * В таком случае ничего не делаем.
     */

    if (!list) {

        return;

    }


    /*
     * Список создаётся КАЖДЫЙ РАЗ заново.
     *
     * Это важно.
     *
     * Нельзя создавать quests вне renderQuests(),
     * потому что тогда значения state.quests
     * будут взяты только один раз —
     * при загрузке JavaScript.
     */

    const quests = [

        {
            title:
                "Первая дверь",

            description:
                "Открой любую книгу первого круга.",

            completed:
                state.quests.firstBook

        },


        {
            title:
                "Научиться смотреть",

            description:
                "Прочти «Искусство Внимания».",

            completed:
                state.quests.attention

        },


        {
            title:
                "Увидеть отражение",

            description:
                "Прочти «Вторую Сторону Зеркала».",

            completed:
                state.quests.perception

        },


        {
            title:
                "Услышать тишину",

            description:
                "Прочти «Комнату Тишины».",

            completed:
                state.quests.silence

        },


        {
            title:
                "Найти сон",

            description:
                "Открой «Атлас Сновидений».",

            completed:
                state.quests.dream

        },


        {
            title:
                "Пройти коридор",

            description:
                "Открой «Зеркальный Коридор».",

            completed:
                state.quests.mirror

        }

    ];


    /*
     * Очищаем старое отображение.
     */

    list.innerHTML = "";


    /*
     * Создаём карточки квестов.
     */

    quests.forEach(
        quest => {

            const element =
                document.createElement(
                    "div"
                );


            /*
             * completed → класс done
             */

            element.className =
                "quest " +
                (
                    quest.completed
                        ? "done"
                        : ""
                );


            /*
             * Отображаем галочку
             * только для выполненного квеста.
             */

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


            list.appendChild(
                element
            );

        }
    );

}





