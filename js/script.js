/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => { // обработчик событий дожидается загрузки ДОМ и потом запускает скрипт
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv' ),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),// добавляем данные в форму
          addInput = addForm.querySelector('.adding__input'),//заходим в класс .adding__input внутри формы
          checkbox = addForm.querySelector('[type="checkbox"]');//для определения любимого фильма использую [] - указатель атрибуа для чекбокс

    addForm.addEventListener('submit', (event) => {// submit - обработчик события, event - объект события, омена действия по умолчанию не даёт перезагрузку страницы
        event.preventDefault();

        let newFilm = addInput.value;// запись в переменную введенного названия
        const favorite = checkbox.checked;//запись в переменную значения из чекбокса "любимый фильм"

        if (newFilm){ //условие для борьбы с пустой строкой, длинной строкой и вывод в консоль надписи "Добавляем любимый фильм"

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm); //добавляем новый фильм в массив
            sortArr(movieDB.movies); //сортируем начальный массив фильмов

            createMovieList(movieDB.movies, movieList);
        }
        
        event.target.reset(); //сброс формы
    });

   const deleteAdv = (arr) => { //функция удаления рекламы
    arr.forEach(item => {
        item.remove();
    });
   };

    // adv.forEach(function(item) {
    //     item.remove();
    // });
    
    const makeChanges = () => { //функция для изменений на странице
        genre.textContent = 'драма';
    
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) => { //функция сортировки элементов массива
        arr.sort();
    };
    
    function createMovieList(films, parent) { //films - фильмы для обработки(movieDB.movies), parent - родитель,который будет использовать эти фильмы(movieList)
        parent.innerHTML = ""; 
        sortArr(films); //сортировка фильмов
        
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

    document.querySelectorAll('.delete').forEach((btn, i) => { //удаление фильма в корзину ('.delete' - корзинка в index.html)
        btn.addEventListener('click', () => { //находим событие "клик"
            btn.parentElement.remove(); // удаление родительского элемента со страницы
            movieDB.movies.splice(i, 1); // вырезаем методом splice элемент массива i в количестве 1

            createMovieList(films, parent); //запускаем рекурсию, которая заново пронумеровывает элементы вновь созданного массива
        });
    });

    }

    deleteAdv(adv);
    makeChanges();
    
    createMovieList(movieDB.movies, movieList);

});