/* =========================================================
   GAME STATE
   Мистическая библиотека
========================================================= */

const STORAGE_KEY = "threshold_library_save";


const DEFAULT_STATE = {

    books: [],

    knowledge: [],

    insights: 0,

    keeperTalk: false,

    keeperStage: 0,

    puzzle: false,

    ending: false,

    room: "Главный зал",

    quests: {

        firstBook: false,

        attention: false,

        perception: false,

        silence: false,

        dream: false,

        mirror: false

    }

};


/* =========================================================
   СОЗДАНИЕ СОСТОЯНИЯ ПО УМОЛЧАНИЮ
========================================================= */

function createDefaultState() {

    return JSON.parse(
        JSON.stringify(DEFAULT_STATE)
    );

}


/* =========================================================
   ЗАГРУЗКА
========================================================= */

function load() {

    try {

        const raw =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (!raw) {

            return createDefaultState();

        }


        const parsed =
            JSON.parse(raw);


        const result = {

            ...createDefaultState(),

            ...parsed

        };


        /*
         * Восстанавливаем объект квестов,
         * даже если старое сохранение
         * не содержит каких-то полей.
         */

        result.quests = {

            ...DEFAULT_STATE.quests,

            ...(parsed.quests || {})

        };


        /*
         * Защита от повреждённых данных.
         */

        if (!Array.isArray(result.books)) {

            result.books = [];

        }


        if (!Array.isArray(result.knowledge)) {

            result.knowledge = [];

        }


        /*
         * Восстанавливаем состояние квестов
         * из реально прочитанных книг.
         */

        result.quests.firstBook =
            result.books.length >= 1;


        result.quests.attention =
            result.books.includes(
                "attention"
            );


        result.quests.perception =
            result.books.includes(
                "perception"
            );


        result.quests.silence =
            result.books.includes(
                "silence"
            );


        result.quests.dream =
            result.books.includes(
                "dream"
            );


        result.quests.mirror =
            result.books.includes(
                "mirror"
            );


        /*
         * Восстанавливаем сюжетные флаги.
         */

        if (
            result.books.includes("mirror") ||
            result.knowledge.includes("mirror")
        ) {

            result.puzzle = true;

        }


        if (
            result.books.includes("dawn") ||
            result.knowledge.includes("awakening")
        ) {

            result.ending = true;

        }


        return result;


    } catch (error) {

        console.warn(
            "Ошибка загрузки сохранения:",
            error
        );


        return createDefaultState();

    }

}


/* =========================================================
   СОСТОЯНИЕ ТЕКУЩЕЙ ИГРЫ
========================================================= */

let state = load();


/* =========================================================
   СОХРАНЕНИЕ
========================================================= */

function save() {

    try {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(state)

        );


        updateUI();


    } catch (error) {

        console.error(
            "Не удалось сохранить игру:",
            error
        );

    }

}


/* =========================================================
   СБРОС
========================================================= */

function resetGameState() {

    state =
        createDefaultState();


    save();


    return state;

}