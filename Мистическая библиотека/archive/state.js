/* =========================================================
   ARCHIVE — ЕДИНАЯ СИСТЕМА СОХРАНЕНИЯ
   archive/state.js
========================================================= */

(function () {

    "use strict";


    const STORAGE_KEY = "archive_game_state";


    /* =====================================================
       НАЧАЛЬНОЕ СОСТОЯНИЕ
    ===================================================== */

    const defaultState = {

        player: {

            name: "Странник",

            knowledge: 0,

            awakening: 0,

            level: 1

        },


        books: {

            collected: [],

            read: [],

            discovered: []

        },


        fragments: [],


        rooms: {

            archive: true,

            dreaming: true,

            amber: false,

            keeper: false,

            innerArchive: false

        },


        keeper: {

            trust: 0,

            stage: 0,

            conversations: [],

            lastReaction: null

        },


        discoveries: [],


        achievements: [],


        statistics: {

            booksCollected: 0,

            booksRead: 0,

            fragmentsFound: 0,

            roomsOpened: 1,

            discoveries: 0,

            sessions: 0

        },


        settings: {

            sound: true,

            effects: true,

            language: "ru"

        },


        createdAt: Date.now(),

        updatedAt: Date.now()

    };


    /* =====================================================
       ГЛУБОКОЕ КОПИРОВАНИЕ
    ===================================================== */

    function clone(object) {

        return JSON.parse(
            JSON.stringify(object)
        );

    }


    /* =====================================================
       ОБЪЕДИНЕНИЕ СОХРАНЕНИЯ
    ===================================================== */

    function mergeDefaults(saved, defaults) {

        const result = clone(defaults);

        if (!saved || typeof saved !== "object") {
            return result;
        }

        Object.keys(saved).forEach(function (key) {

            if (
                saved[key] &&
                typeof saved[key] === "object" &&
                !Array.isArray(saved[key]) &&
                result[key] &&
                typeof result[key] === "object" &&
                !Array.isArray(result[key])
            ) {

                result[key] =
                    mergeDefaults(
                        saved[key],
                        result[key]
                    );

            } else {

                result[key] = saved[key];

            }

        });

        return result;

    }


    /* =====================================================
       ЗАГРУЗКА
    ===================================================== */

    function load() {

        try {

            const raw =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!raw) {

                return clone(
                    defaultState
                );

            }

            const saved =
                JSON.parse(raw);

            return mergeDefaults(
                saved,
                defaultState
            );

        } catch (error) {

            console.warn(
                "Не удалось загрузить состояние Архива:",
                error
            );

            return clone(
                defaultState
            );

        }

    }


    let state = load();


    /* =====================================================
       СОХРАНЕНИЕ
    ===================================================== */

    function save() {

        state.updatedAt =
            Date.now();

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state)
            );

            return true;

        } catch (error) {

            console.warn(
                "Не удалось сохранить состояние Архива:",
                error
            );

            return false;

        }

    }


    /* =====================================================
       СБРОС
    ===================================================== */

    function reset() {

        state =
            clone(defaultState);

        save();

        return state;

    }


    /* =====================================================
       КНИГИ
    ===================================================== */

    function collectBook(bookId) {

        if (!bookId) return false;

        if (
            !state.books.collected.includes(
                bookId
            )
        ) {

            state.books.collected.push(
                bookId
            );

            state.statistics.booksCollected++;

            addKnowledge(10);

            save();

            checkAchievements();

            return true;

        }

        return false;

    }


    function markBookRead(bookId) {

        if (!bookId) return false;

        if (
            !state.books.read.includes(
                bookId
            )
        ) {

            state.books.read.push(
                bookId
            );

            state.statistics.booksRead++;

            addKnowledge(25);

            save();

            checkAchievements();

            return true;

        }

        return false;

    }


    function discoverBook(bookId) {

        if (!bookId) return false;

        if (
            !state.books.discovered.includes(
                bookId
            )
        ) {

            state.books.discovered.push(
                bookId
            );

            addKnowledge(5);

            save();

            return true;

        }

        return false;

    }


    /* =====================================================
       ФРАГМЕНТЫ
    ===================================================== */

    function addFragment(fragmentId) {

        if (!fragmentId) return false;

        if (
            !state.fragments.includes(
                fragmentId
            )
        ) {

            state.fragments.push(
                fragmentId
            );

            state.statistics.fragmentsFound++;

            addKnowledge(15);

            addAwakening(2);

            save();

            checkAchievements();

            return true;

        }

        return false;

    }


    function hasFragment(fragmentId) {

        return state.fragments.includes(
            fragmentId
        );

    }


    /* =====================================================
       ЗНАНИЕ
    ===================================================== */

    function addKnowledge(amount) {

        amount =
            Number(amount) || 0;

        if (amount <= 0) {
            return;
        }

        state.player.knowledge +=
            amount;

        updateLevel();

        save();

    }


    /* =====================================================
       ПРОБУЖДЕНИЕ
    ===================================================== */

    function addAwakening(amount) {

        amount =
            Number(amount) || 0;

        if (amount <= 0) {
            return;
        }

        state.player.awakening +=
            amount;

        updateLevel();

        save();

    }


    /* =====================================================
       УРОВЕНЬ
    ===================================================== */

    function updateLevel() {

        const knowledge =
            state.player.knowledge;

        const awakening =
            state.player.awakening;


        const level =
            Math.max(
                1,
                Math.floor(
                    (
                        knowledge +
                        awakening * 5
                    ) / 100
                ) + 1
            );


        state.player.level =
            level;


        updateRooms();

    }


    /* =====================================================
       ОТКРЫТИЕ КОМНАТ
    ===================================================== */

    function updateRooms() {

        const level =
            state.player.level;


        /*
            Первый круг
            всегда открыт.
        */


        /*
            Комната Сновидений
            открыта с самого начала.
        */

        if (level >= 2) {

            state.rooms.amber =
                true;

        }


        if (level >= 4) {

            state.rooms.keeper =
                true;

        }


        if (level >= 7) {

            state.rooms.innerArchive =
                true;

        }


        state.statistics.roomsOpened =
            Object.values(
                state.rooms
            ).filter(Boolean).length;

    }


    function unlockRoom(roomId) {

        if (
            !roomId ||
            !(roomId in state.rooms)
        ) {

            return false;

        }


        if (!state.rooms[roomId]) {

            state.rooms[roomId] =
                true;

            state.statistics.roomsOpened++;

            addKnowledge(20);

            addAwakening(5);

            save();

            return true;

        }


        return false;

    }


    function isRoomOpen(roomId) {

        return !!state.rooms[roomId];

    }


    /* =====================================================
       ХРАНИТЕЛЬ
    ===================================================== */

    function addKeeperTrust(amount) {

        amount =
            Number(amount) || 0;

        if (amount === 0) {
            return;
        }


        state.keeper.trust +=
            amount;


        /*
            Хранитель меняет отношение
            к игроку по мере доверия.
        */

        if (
            state.keeper.trust >= 100
        ) {

            state.keeper.stage = 4;

        }

        else if (
            state.keeper.trust >= 60
        ) {

            state.keeper.stage = 3;

        }

        else if (
            state.keeper.trust >= 30
        ) {

            state.keeper.stage = 2;

        }

        else if (
            state.keeper.trust >= 10
        ) {

            state.keeper.stage = 1;

        }

        else {

            state.keeper.stage = 0;

        }


        save();

    }


    function rememberKeeperConversation(
        conversationId
    ) {

        if (!conversationId) {
            return false;
        }


        if (
            !state.keeper.conversations.includes(
                conversationId
            )
        ) {

            state.keeper.conversations.push(
                conversationId
            );

            addKeeperTrust(5);

            save();

            return true;

        }

        return false;

    }


    function setKeeperReaction(
        reactionId
    ) {

        state.keeper.lastReaction =
            reactionId;

        save();

    }


    /* =====================================================
       ОТКРЫТИЯ
    ===================================================== */

    function addDiscovery(
        discoveryId
    ) {

        if (!discoveryId) {
            return false;
        }


        if (
            !state.discoveries.includes(
                discoveryId
            )
        ) {

            state.discoveries.push(
                discoveryId
            );

            state.statistics.discoveries++;

            addKnowledge(20);

            addAwakening(3);

            save();

            checkAchievements();

            return true;

        }

        return false;

    }


    /* =====================================================
       ДОСТИЖЕНИЯ
    ===================================================== */

    function unlockAchievement(
        achievementId
    ) {

        if (!achievementId) {
            return false;
        }


        if (
            !state.achievements.includes(
                achievementId
            )
        ) {

            state.achievements.push(
                achievementId
            );

            save();

            return true;

        }

        return false;

    }


    function checkAchievements() {

        if (
            state.statistics.booksCollected >= 1
        ) {

            unlockAchievement(
                "first_book"
            );

        }


        if (
            state.statistics.booksRead >= 1
        ) {

            unlockAchievement(
                "first_read"
            );

        }


        if (
            state.statistics.fragmentsFound >= 3
        ) {

            unlockAchievement(
                "three_fragments"
            );

        }


        if (
            state.player.level >= 5
        ) {

            unlockAchievement(
                "awakened"
            );

        }


        if (
            state.keeper.trust >= 50
        ) {

            unlockAchievement(
                "keepers_trust"
            );

        }

    }


    /* =====================================================
       СТАТИСТИКА
    ===================================================== */

    function getStats() {

        return {

            knowledge:
                state.player.knowledge,

            awakening:
                state.player.awakening,

            level:
                state.player.level,

            books:
                state.books.collected.length,

            read:
                state.books.read.length,

            fragments:
                state.fragments.length,

            discoveries:
                state.discoveries.length,

            achievements:
                state.achievements.length,

            keeperTrust:
                state.keeper.trust,

            keeperStage:
                state.keeper.stage,

            rooms:
                state.statistics.roomsOpened

        };

    }


    /* =====================================================
       НОВАЯ ИГРОВАЯ СЕССИЯ
    ===================================================== */

    function startSession() {

        state.statistics.sessions++;

        save();

    }


    /* =====================================================
       ЭКСПОРТ
    ===================================================== */

    window.ArchiveGame = {

        state,

        load: function () {

            state = load();

            this.state = state;

            return state;

        },


        save,


        reset,


        collectBook,

        markBookRead,

        discoverBook,


        addFragment,

        hasFragment,


        addKnowledge,

        addAwakening,


        unlockRoom,

        isRoomOpen,


        addKeeperTrust,

        rememberKeeperConversation,

        setKeeperReaction,


        addDiscovery,


        unlockAchievement,


        checkAchievements,


        getStats,


        startSession

    };


    /* =====================================================
       ИНИЦИАЛИЗАЦИЯ
    ===================================================== */

    updateLevel();

    startSession();


    console.log(
        "◈ Архивная система загружена",
        ArchiveGame.getStats()
    );

})();