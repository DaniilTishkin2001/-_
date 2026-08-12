
/* =========================================================
   GAME STATE
   Мистическая библиотека
========================================================= */

const STORAGE_KEY = "threshold_library_save";


/* =========================================================
   СОСТОЯНИЕ ПО УМОЛЧАНИЮ
========================================================= */

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
   СОЗДАНИЕ НОВОГО СОСТОЯНИЯ
========================================================= */

function createDefaultState() {

    return JSON.parse(
        JSON.stringify(DEFAULT_STATE)
    );

}


/* =========================================================
   ЗАГРУЗКА СОХРАНЕНИЯ
========================================================= */

function load() {

    try {

        const raw =
            localStorage.getItem(
                STORAGE_KEY
            );


        /*
         * Если сохранения нет —
         * начинаем новую игру.
         */

        if (!raw) {

            return createDefaultState();

        }


        const parsed =
            JSON.parse(raw);


        /*
         * Объединяем сохранение
         * с актуальной структурой состояния.
         *
         * Это позволяет добавлять новые поля
         * в будущих версиях игры,
         * не ломая старые сохранения.
         */

        const result = {

            ...createDefaultState(),

            ...parsed

        };


        /*
         * Отдельно восстанавливаем объект квестов.
         */

        result.quests = {

            ...DEFAULT_STATE.quests,

            ...(parsed.quests || {})

        };


        /* =====================================================
           ЗАЩИТА ДАННЫХ
        ===================================================== */

        if (!Array.isArray(result.books)) {

            result.books = [];

        }


        if (!Array.isArray(result.knowledge)) {

            result.knowledge = [];

        }


        /*
         * На этом этапе НЕ пересчитываем квесты здесь.
         *
         * Квестовая система будет находиться
         * в js/quests.js.
         *
         * Это важно:
         *
         * state.js отвечает за состояние,
         * quests.js отвечает за правила квестов.
         */


        /* =====================================================
           ВОССТАНОВЛЕНИЕ СЮЖЕТНЫХ ФЛАГОВ
        ===================================================== */

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


        /*
         * Если сохранение повреждено —
         * начинаем с чистого состояния.
         */

        return createDefaultState();

    }

}


/* =========================================================
   ТЕКУЩЕЕ СОСТОЯНИЕ ИГРЫ
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


        /*
         * Пока оставляем updateUI() здесь.
         *
         * Позже отдельно разделим:
         *
         * save()
         * updateUI()
         *
         * Но сейчас не меняем это поведение,
         * чтобы не сломать существующую игру.
         */

        updateUI();


    } catch (error) {

        console.error(

            "Не удалось сохранить игру:",

            error

        );

    }

}


/* =========================================================
   СБРОС ИГРЫ
========================================================= */

function resetGameState() {

    state =
        createDefaultState();


    save();


    return state;

}

