/*
 * ХРАМ ЗНАНИЙ
 * Игровая система
 */

const GAME_KEY = "hram_znaniy_player";


const DEFAULT_PLAYER = {

    xp: 0,

    level: 1,

    booksRead: 0,

    chaptersRead: 0,

    pagesRead: 0,

    achievements: [],

    progress: {}

};


let player = loadPlayer();


function loadPlayer() {

    try {

        const saved =
            localStorage.getItem(GAME_KEY);

        if (!saved) {

            return {
                ...DEFAULT_PLAYER
            };

        }

        return {
            ...DEFAULT_PLAYER,
            ...JSON.parse(saved)
        };

    } catch (error) {

        console.error(
            "Не удалось загрузить прогресс:",
            error
        );

        return {
            ...DEFAULT_PLAYER
        };
    }
}


function savePlayer() {

    localStorage.setItem(
        GAME_KEY,
        JSON.stringify(player)
    );

    updateGameInterface();
}


function xpForNextLevel() {

    return player.level * 100;
}


function addXP(amount) {

    player.xp += amount;

    showXP(amount);

    let leveledUp = false;

    while (
        player.xp >= xpForNextLevel()
    ) {

        player.xp -= xpForNextLevel();

        player.level++;

        leveledUp = true;
    }


    if (leveledUp) {

        showLevelUp();

    }


    checkAchievements();

    savePlayer();
}


function updateGameInterface() {

    const levelElement =
        document.getElementById("playerLevel");

    const xpText =
        document.getElementById("xpText");

    const xpBar =
        document.getElementById("xpBar");


    if (!levelElement) return;


    levelElement.textContent =
        player.level;


    const needed =
        xpForNextLevel();


    xpText.textContent =
        `${player.xp} / ${needed}`;


    const percentage =
        Math.min(
            100,
            (player.xp / needed) * 100
        );


    xpBar.style.width =
        `${percentage}%`;
}


function showXP(amount) {

    const notification =
        document.getElementById(
            "xpNotification"
        );

    const amountElement =
        document.getElementById(
            "xpAmount"
        );


    amountElement.textContent =
        amount;


    notification.classList.remove(
        "show"
    );


    void notification.offsetWidth;


    notification.classList.add(
        "show"
    );
}


function showLevelUp() {

    setTimeout(() => {

        alert(
            `✨ Новый уровень!\n\n` +
            `Ты достиг уровня ${player.level}.`
        );

    }, 700);
}


const ACHIEVEMENTS = [

    {
        id: "first-page",

        icon: "📖",

        title: "Первый шаг",

        description:
            "Прочитать первую страницу.",

        condition:
            () => player.pagesRead >= 1
    },


    {
        id: "ten-pages",

        icon: "🌙",

        title: "Ночной читатель",

        description:
            "Прочитать 10 страниц.",

        condition:
            () => player.pagesRead >= 10
    },


    {
        id: "first-book",

        icon: "🔮",

        title: "Искатель",

        description:
            "Завершить первую книгу.",

        condition:
            () => player.booksRead >= 1
    },


    {
        id: "level-five",

        icon: "✦",

        title: "Ученик Храма",

        description:
            "Достичь пятого уровня.",

        condition:
            () => player.level >= 5
    }

];


function checkAchievements() {

    for (const achievement of ACHIEVEMENTS) {

        if (
            !player.achievements.includes(
                achievement.id
            )
            &&
            achievement.condition()
        ) {

            player.achievements.push(
                achievement.id
            );

            showAchievement(
                achievement
            );
        }
    }

    renderAchievements();
}


function renderAchievements() {

    const container =
        document.getElementById(
            "achievementsList"
        );


    if (!container) return;


    container.innerHTML = "";


    ACHIEVEMENTS.forEach(
        achievement => {

            const unlocked =
                player.achievements.includes(
                    achievement.id
                );


            const element =
                document.createElement("div");


            element.className =
                "achievement " +
                (
                    unlocked
                        ? "unlocked"
                        : ""
                );


            element.innerHTML = `

                <div class="achievement-icon">
                    ${achievement.icon}
                </div>

                <div class="achievement-title">
                    ${achievement.title}
                </div>

                <div class="achievement-description">
                    ${achievement.description}
                </div>

            `;


            container.appendChild(
                element
            );
        }
    );
}


function showAchievement(
    achievement
) {

    addXP(25);

    setTimeout(() => {

        alert(
            `🏆 Достижение получено!\n\n` +
            `${achievement.title}\n` +
            `${achievement.description}\n\n` +
            `+25 XP`
        );

    }, 500);
}


updateGameInterface();