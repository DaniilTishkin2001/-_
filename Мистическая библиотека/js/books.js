const BOOKS = [

{
    id:"threshold",
    title:"Книга Порога",
    category:"Начало пути",
    symbol:"Ⅰ",
    description:
        "О первой двери, которую невозможно увидеть глазами.",
    text:[
        "У каждой библиотеки есть дверь, которой нет на плане здания.",
        "Она появляется только тогда, когда человек перестаёт искать выход.",
        "Первый порог не ведёт в другую комнату. Он ведёт к другому способу смотреть.",
        "Поэтому старые хранители никогда не спрашивали посетителя: «Что ты ищешь?»",
        "Они спрашивали: «Что ты готов перестать считать невозможным?»"
    ],
    insight:
        "Первый шаг — заметить то, что всегда находилось перед глазами.",
    knowledge:"attention"
},

{
    id:"attention",
    title:"Искусство Внимания",
    category:"Практика",
    symbol:"Ⅱ",
    description:
        "О способности видеть больше одного слоя происходящего.",
    text:[
        "Внимание похоже на свечу в огромной комнате.",
        "Оно не создаёт предметы. Оно решает, какие из них будут существовать для тебя.",
        "Человек может пройти мимо тысячи деталей и помнить лишь одну.",
        "Но если внимание становится тихим, пространство начинает возвращать забытые вещи.",
        "Тогда библиотека перестаёт быть зданием и становится разговором."
    ],
    insight:
        "Куда направлено внимание — там постепенно возникает твой мир.",
    knowledge:"attention2"
},

{
    id:"perception",
    title:"Вторая Сторона Зеркала",
    category:"Восприятие",
    symbol:"Ⅲ",
    description:
        "Небольшое руководство по сомнению в очевидном.",
    text:[
        "Зеркало ничего не показывает.",
        "Оно лишь возвращает тебе то, что ты принёс к нему.",
        "Если ты приходишь с уверенностью, оно отражает уверенность.",
        "Если приходишь со страхом, оно становится тёмным.",
        "Но если смотреть достаточно долго, появляется странный момент:",
        "ты начинаешь замечать, что отражение смотрит первым."
    ],
    insight:
        "Восприятие — не окно. Это соавтор реальности.",
    knowledge:"perception"
},

{
    id:"silence",
    title:"Комната Тишины",
    category:"Тишина",
    symbol:"Ⅳ",
    description:
        "Книга без единого ответа.",
    text:[
        "В комнате Тишины нет мебели.",
        "Нет окон.",
        "Нет даже книги.",
        "Поэтому первое желание посетителя — уйти.",
        "Если он остаётся, сначала исчезают звуки.",
        "Потом исчезает необходимость отвечать.",
        "И наконец становится слышно то, что всё это время происходило внутри."
    ],
    insight:
        "Тишина не является отсутствием звука. Она является отсутствием лишнего.",
    knowledge:"silence"
},

{
    id:"dream",
    title:"Атлас Сновидений",
    category:"Сновидение",
    symbol:"Ⅴ",
    description:
        "Карта мест, которых нет после пробуждения.",
    text:[
        "Некоторые комнаты существуют только во сне.",
        "И всё же иногда после пробуждения человек помнит их точнее собственной квартиры.",
        "В старых записях говорится: если одно и то же место снится трижды, оно уже не сон.",
        "Это библиотека пытается вспомнить тебя.",
        "Не пытайся управлять сновидением.",
        "Сначала научись замечать, когда оно началось."
    ],
    insight:
        "Осознанность начинается с вопроса: «Когда я перестал замечать, что сплю?»",
    knowledge:"dream"
},

{
    id:"intention",
    title:"Книга Намерения",
    category:"Воля",
    symbol:"Ⅵ",
    description:
        "О разнице между желанием и направлением.",
    text:[
        "Желание говорит: «Я хочу».",
        "Намерение говорит: «Я иду».",
        "Первое может исчезнуть утром.",
        "Второе продолжает двигаться даже тогда, когда человек сомневается.",
        "Поэтому намерение не является силой.",
        "Это направление, которое ты выбираешь снова и снова."
    ],
    insight:
        "Намерение — это действие, которому не нужно настроение.",
    knowledge:"intention"
},

{
    id:"shadow",
    title:"Архив Теней",
    category:"Тень",
    symbol:"Ⅶ",
    description:
        "Истории о вещах, которые человек предпочитает не замечать.",
    text:[
        "В библиотеке есть полка, куда никто не ставит книги.",
        "На ней лежат вещи, которые люди забыли о себе.",
        "Страх.",
        "Зависть.",
        "Гордость.",
        "Незаконченные слова.",
        "Хранитель говорит, что эту полку нельзя уничтожить.",
        "Потому что человек, уничтоживший собственную тень, потеряет и собственный свет."
    ],
    insight:
        "Тень не требует уничтожения. Ей требуется быть увиденной.",
    knowledge:"shadow"
},

{
    id:"mirror",
    title:"Зеркальный Коридор",
    category:"Переход",
    symbol:"Ⅷ",
    description:
        "Коридор, который становится длиннее после каждого ответа.",
    text:[
        "На стенах Зеркального коридора нет дверей.",
        "Но каждые несколько шагов зеркало показывает дверь позади.",
        "Если повернуться, двери нет.",
        "Если продолжить идти, появляется новая.",
        "Хранитель утверждает, что коридор проверяет не смелость.",
        "Он проверяет способность не возвращаться за каждым своим прошлым выбором."
    ],
    insight:
        "Не каждый путь обязан быть обратимым.",
    knowledge:"mirror"
},

{
    id:"name",
    title:"Имя, Которого Нет",
    category:"Идентичность",
    symbol:"Ⅸ",
    description:
        "Книга о том, что происходит, когда привычное имя перестаёт объяснять человека.",
    text:[
        "Имя удобно.",
        "Оно позволяет быстро объяснить себе, кто ты.",
        "Но однажды человек замечает, что имя описывает только прошлое.",
        "И тогда возникает странная пустота.",
        "В этой пустоте нет необходимости немедленно придумывать новое имя.",
        "Иногда достаточно некоторое время побыть без определения."
    ],
    insight:
        "Не всё неизвестное обязано немедленно получить имя.",
    knowledge:"identity"
},

{
    id:"dawn",
    title:"Книга Рассвета",
    category:"Пробуждение",
    symbol:"Ⅹ",
    description:
        "Последняя книга первого круга.",
    text:[
        "Рассвет не является противоположностью ночи.",
        "Он показывает, что ночь никогда не была окончательной.",
        "Человек, прошедший библиотеку, часто ждёт большого откровения.",
        "Но вместо него утром приходит обычный свет.",
        "Обычная пыль.",
        "Обычный стол.",
        "Обычная книга.",
        "И только взгляд становится немного другим."
    ],
    insight:
        "Просветление не обязано выглядеть как чудо. Иногда оно выглядит как внимательность.",
    knowledge:"awakening"
}

];
function createShelfBooks(){

    const rows =
        document.querySelectorAll(
            ".shelfRow"
        );


    rows.forEach(row=>{

        /*
         * Защита от повторного создания,
         * если init случайно вызван повторно.
         */

        if(row.children.length>0){
            return;
        }


        for(let i=0;i<10;i++){

            const book =
                document.createElement("div");


            const colors=[
                "gold",
                "purple",
                "red",
                "green",
                "blue",
                "dark"
            ];


            book.className =
                "book "+
                colors[
                    Math.floor(
                        Math.random()*
                        colors.length
                    )
                ];


            book.style.height =
                (34+Math.random()*16)+"px";


            book.style.width =
                (12+Math.random()*7)+"px";


            row.appendChild(book);

        }

    });

}
function renderBooks(){

    const grid =
        document.getElementById(
            "booksGrid"
        );


    grid.innerHTML="";


    BOOKS.forEach((book,index)=>{

        const unlocked =
            index===0 ||
            state.books.includes(
                BOOKS[index-1].id
            );


        const collected =
            state.books.includes(
                book.id
            );


        const card =
            document.createElement("div");


        card.className =
            "bookCard "+
            (!unlocked?"locked":"");


        card.innerHTML=`

            <span class="tag">
                ${
                    collected
                    ? "прочитано"
                    : unlocked
                        ? "доступно"
                        : "закрыто"
                }
            </span>

            <div class="cover">
                ${book.symbol}
            </div>

            <h3>
                ${book.title}
            </h3>

            <p>
                ${book.description}
            </p>

        `;


        if(unlocked){

            card.onclick=()=>{
                openBook(index);
            };

        }


        grid.appendChild(card);

    });

}
function openBook(index){

    const book =
        BOOKS[index];


    if(!book){
        return;
    }


    const unlocked =
        index===0 ||
        state.books.includes(
            BOOKS[index-1].id
        );


    if(!unlocked){

        showToast(
            "Эта книга пока не знает твоего имени."
        );

        return;

    }


    document.getElementById(
        "readerTitle"
    ).textContent =
        book.title;


    document.getElementById(
        "readerAuthor"
    ).textContent =
        book.category+
        " · том "+
        book.symbol;


    const text =
        document.getElementById(
            "readerText"
        );


    text.innerHTML =
        book.text
            .map(
                p=>`<p>${p}</p>`
            )
            .join("");


    document.getElementById(
        "readerInsight"
    ).textContent =
        "✦ Озарение: "+
        book.insight;


    document.getElementById(
        "readerButton"
    ).textContent =
        state.books.includes(book.id)
            ? "Закрыть книгу"
            : "Сохранить знание";


    document
        .getElementById("readerPanel")
        .classList
        .add("show");


    window.currentBook =
        book;

}
function finishReading(){

    const book =
        window.currentBook;


    if(!book){
        return;
    }


    const wasRead =
        state.books.includes(
            book.id
        );


    if(!wasRead){

        state.books.push(
            book.id
        );


        if(
            !state.knowledge.includes(
                book.knowledge
            )
        ){

            state.knowledge.push(
                book.knowledge
            );

        }


        state.insights += 1;


        progressQuests();


        /*
         * ВАЖНО:
         * сначала сохраняем состояние,
         * затем обновляем карту.
         */

        save();

        updateMap();


        showToast(
            "Озарение получено · "+
            book.title
        );


        specialBookEvents(
            book
        );

    }


    closeReader();

}
