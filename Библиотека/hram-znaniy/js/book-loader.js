/*
 * ==========================================
 * ЗАГРУЗЧИК КНИГ
 * ==========================================
 */

const BookLoader = {

    cache: {},


    async load(bookId) {

        if (this.cache[bookId]) {

            return this.cache[bookId];

        }


        try {

            const response =
                await fetch(
                    `books/${bookId}/book.json`
                );


            if (!response.ok) {

                throw new Error(
                    `Не удалось загрузить книгу: ${bookId}`
                );

            }


            const book =
                await response.json();


            this.cache[bookId] =
                book;


            return book;

        }

        catch (error) {

            console.error(
                "Ошибка загрузки книги:",
                error
            );

            return null;

        }

    },


    async loadChapters(bookId) {

        try {

            const response =
                await fetch(
                    `books/${bookId}/chapters.json`
                );


            if (!response.ok) {

                throw new Error(
                    "Файл chapters.json не найден"
                );

            }


            const chapters =
                await response.json();


            return chapters;

        }

        catch (error) {

            console.warn(
                `Главы книги ${bookId} пока не загружены.`,
                error
            );


            return [];

        }

    }

};