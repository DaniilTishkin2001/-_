 const quests=[

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

function progressQuests(book){

    state.quests.firstBook =
        state.books.length>=1;


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
function renderQuests(){

    const list =
        document.getElementById(
            "questList"
        );


    


    list.innerHTML="";


    quests.forEach(q=>{

        const el =
            document.createElement(
                "div"
            );


        el.className =
            "quest "+
            (q[2]?"done":"");


        el.innerHTML=`

            <h3>
                ${q[2]?"✓ ":""}${q[0]}
            </h3>

            <p>
                ${q[1]}
            </p>

        `;


        list.appendChild(el);

    });

}
