-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 21 2022 г., 17:43
-- Версия сервера: 10.3.16-MariaDB
-- Версия PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `films`
--

-- --------------------------------------------------------

--
-- Структура таблицы `arrayfilms`
--

CREATE TABLE `arrayfilms` (
  `id` int(11) NOT NULL,
  `id_film` int(11) NOT NULL,
  `id_collection` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `arrayfilms`
--

INSERT INTO `arrayfilms` (`id`, `id_film`, `id_collection`) VALUES
(66, 29, 19),
(67, 30, 19),
(68, 32, 19),
(69, 24, 20),
(70, 26, 20),
(71, 31, 20),
(72, 33, 20),
(73, 32, 20),
(74, 30, 20),
(75, 29, 20);

-- --------------------------------------------------------

--
-- Структура таблицы `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `collections`
--

INSERT INTO `collections` (`id`, `name`, `description`) VALUES
(19, 'Первая подборка', 'Это первая подборка'),
(20, 'Вторая подборка', 'Это новая подборка');

-- --------------------------------------------------------

--
-- Структура таблицы `estimation`
--

CREATE TABLE `estimation` (
  `id` int(11) NOT NULL,
  `estimation` float NOT NULL,
  `id_film` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `estimation`
--

INSERT INTO `estimation` (`id`, `estimation`, `id_film`, `id_user`) VALUES
(89, 8, 24, 7),
(90, 10, 29, 7),
(96, 10, 29, 1),
(97, 9, 24, 1),
(98, 9, 31, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `id_film` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `feedback`
--

INSERT INTO `feedback` (`id`, `feedback`, `id_film`, `id_user`, `date`) VALUES
(12, 'asdas', 24, 1, '2022-05-26 03:44:08'),
(26, 'Отличный фильм', 29, 7, '2022-06-21 09:21:18');

-- --------------------------------------------------------

--
-- Структура таблицы `films`
--

CREATE TABLE `films` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `genre` varchar(100) NOT NULL,
  `director` varchar(100) NOT NULL,
  `year` year(4) NOT NULL,
  `country` varchar(50) NOT NULL,
  `cover` varchar(100) NOT NULL,
  `estimation` float NOT NULL,
  `countUsers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `films`
--

INSERT INTO `films` (`id`, `name`, `description`, `genre`, `director`, `year`, `country`, `cover`, `estimation`, `countUsers`) VALUES
(24, 'Человек-паук: Нет пути домой', 'Жизнь и репутация Питера Паркера оказываются под угрозой, поскольку Мистерио раскрыл всему миру тайну личности Человека-паука. Пытаясь исправить ситуацию, Питер обращается за помощью к Стивену Стрэнджу, но вскоре всё становится намного опаснее.', 'Фантастический фильм', ' Джон Уоттс', 2021, ' США', 'public\\images\\1653509457917-Человек-паук.webp', 8.5, 2),
(26, 'Крестный отец', 'Фильм про ганстеров 1986 года', 'Боевик', 'Иван Петров', 1986, 'США', 'public\\images\\1654520034496-Крестный отец3.webp', 0, 0),
(29, 'Драйв', 'Великолепный водитель – при свете дня он выполняет каскадерские трюки на съёмочных площадках Голливуда, а по ночам ведет рискованную игру. Но один опасный контракт – и за его жизнь назначена награда. Теперь, чтобы остаться в живых и спасти свою очаровательную соседку, он должен делать то, что умеет лучше всего – виртуозно уходить от погони.', 'Боевик', ' Николас Виндинг Рефн', 2011, 'США', 'public\\images\\1655754370917-Драйв.webp', 10, 2),
(30, 'Бегущий по лезвию 2049', 'В недалеком будущем мир населен людьми и репликантами, созданными выполнять самую тяжелую работу. Работа офицера полиции Кей - держать репликантов под контролем в условиях нарастающего напряжения... Пока он случайно не становится обладателем секретной информации, которая ставит под угрозу существование всего человечества. Желая найти ключ к разгадке, Кей решает разыскать Рика Декарда, бывшего офицера специального подразделения полиции Лос-Анджелеса, который бесследно исчез много лет назад.', 'Боевик', ' Дени Вильнёв', 2017, ' США', 'public\\images\\1655754463652-Бегущий по лезвию.webp', 0, 0),
(31, 'Великий Гэтсби', 'Весной 1922 года, в эпоху разлагающейся морали, блистательного джаза и «королей контрабандного алкоголя», Ник Каррауэй приезжает из Среднего Запада в Нью-Йорк. Преследуя собственную американскую мечту, он селится по соседству с таинственным, известным своими вечеринками миллионером Джеем Гэтсби, а на противоположном берегу бухты проживают его кузина Дэйзи и её муж, повеса и аристократ, Том Бьюкенен. Так Ник оказывается вовлечённым в захватывающий мир богатых — их иллюзий, любви и обманов. Он становится свидетелем происходящего в этом мире и пишет историю невозможной любви, вечных мечтаний и человеческой трагедии, которые являются отражением современных времен и нравов.', 'Мелодрама', ' Баз Лурман', 2013, 'США', 'public\\images\\1655754642185-Великий Гэтсби.webp', 9, 1),
(32, 'Интерстеллар', 'Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину (которая предположительно соединяет области пространства-времени через большое расстояние) в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека и найти планету с подходящими для человечества условиями.', 'Фантастический фильм', ' Кристофер Нолан', 2014, ' США', 'public\\images\\1655754748492-Интерстеллар.webp', 0, 0),
(33, 'Гладиатор', 'В великой Римской империи не было военачальника, равного генералу Максимусу. Непобедимые легионы, которыми командовал этот благородный воин, боготворили его и могли последовать за ним даже в ад. Но случилось так, что отважный Максимус, готовый сразиться с любым противником в честном бою, оказался бессилен против вероломных придворных интриг. Генерала предали и приговорили к смерти. Чудом избежав гибели, Максимус становится гладиатором.', 'Боевик', ' Ридли Скотт', 2000, ' США', 'public\\images\\1655754863021-Гладиатор.webp', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `avatar`) VALUES
(1, 'Rodjon', 'rshipko147@gmail.com', '$2b$07$hHUMKkdI3i9XlMog9ekxDO928RY1cNX.ltorCrQesQv8lVzB/By4G', 'admin', 'public\\avatar\\1655766528759-photo_2022-04-19_22-22-36.jpg'),
(7, 'qwerty', 'qwerty@gmail.com', '$2b$07$nuru1VEt/j19Exmlb3axRuv/Iv/QNDLHXDWtS1f9itFBJ7c0h3Sa.', 'user', 'null');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `arrayfilms`
--
ALTER TABLE `arrayfilms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_film` (`id_film`),
  ADD KEY `array_ibfk_2` (`id_collection`);

--
-- Индексы таблицы `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `estimation`
--
ALTER TABLE `estimation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_film` (`id_film`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_film` (`id_film`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `arrayfilms`
--
ALTER TABLE `arrayfilms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT для таблицы `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `estimation`
--
ALTER TABLE `estimation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT для таблицы `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `films`
--
ALTER TABLE `films`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `arrayfilms`
--
ALTER TABLE `arrayfilms`
  ADD CONSTRAINT `arrayfilms_ibfk_1` FOREIGN KEY (`id_film`) REFERENCES `films` (`id`),
  ADD CONSTRAINT `arrayfilms_ibfk_2` FOREIGN KEY (`id_collection`) REFERENCES `collections` (`id`);

--
-- Ограничения внешнего ключа таблицы `estimation`
--
ALTER TABLE `estimation`
  ADD CONSTRAINT `estimation_ibfk_1` FOREIGN KEY (`id_film`) REFERENCES `films` (`id`),
  ADD CONSTRAINT `estimation_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`id_film`) REFERENCES `films` (`id`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
