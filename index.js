// сервер
const express = require('express');

// загрузка файлов
const path = require('path');
const bodyParser = require('body-parser');
const session = require("express-session"); 

// шаблонизатор
const { engine } = require('express-handlebars');

// создаём парсер данных формы
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// контроллеры
const login = require('./controllers/login');
const admin = require('./controllers/admin');
const news = require('./controllers/news');

const gameRooms = require('./controllers/game_rooms');
const messages = require('./controllers/messages');
const members = require('./controllers/members');
const app = express();

// Настройки шаблонизатора
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(express.static(path.join(__dirname, '/public')));

app.use(
    session({
       secret: "wpn587w8pcf54",
       saveUninitialized: true,
       cookie: {
        maxAge: 24*60*60*1000 //вот в этом объекте задается время жизни сессии
       }
    })
);

// ---- Роутер ---
// -- Главная страница админки --
app.get("/admin?/", admin.admin);
app.get("/exit?/", admin.exit);

app.get("/create-user?/", admin.create);
app.post("/create-user-action?/", urlencodedParser, admin.createAction);

app.get("/update-user@:user_id?/", admin.update);
app.post("/update-user-action?/", urlencodedParser, admin.updateAction);

app.get("/remove-user/:user_id?/", admin.remove);
app.get("/blocked-user/:user_id?/", admin.blocked);

// форма логина
app.get("/login?/", login.login);
app.post("/login-action?/", urlencodedParser, login.loginAction);




// -- Новости --
app.get("/news?/", news.news);
app.get("/create-news?/", news.create);
app.post("/create-news-action?/", urlencodedParser, news.createAction);

app.get("/update-news:user_id?/", news.update);
app.post("/update-news-action?/", urlencodedParser, news.updateAction);

app.get("/remove-news/:user_id?/", news.remove);

// -- Игровые комнаты --

//Создание игровой комнаты
app.post("/api-create-game-room?/", urlencodedParser, gameRooms.apiCreate);

//Вывод списка игровых комнат
app.get("/api-game-rooms?/", gameRooms.apiGameRooms);


//Вывод списка новостей
app.get("/api-news?/", news.apiNews);

//Вывод списка пользователей
app.get("/api-users?/", admin.apiUsers);



//Добавление сообщения
app.post("/api-add-message-game-room?/", urlencodedParser, messages.apiAddMessage);


//Вывод списка сообщений
app.get("/api-game-rooms-messages?/", messages.apiGameRoomsMessages);


//Вывод списка участников
app.get("/api-game-rooms-members?/", members.apiGameRoomsMembers);

//Добавление участника в игровую комнату
app.post("/api-add-member-game-room?/", urlencodedParser, members.apiAddMemberGameRoom);


//Удаление участника в игровую комнату
app.post("/api-remove-member-game-room?/", urlencodedParser, members.apiRemoveMemberGameRoom);

// запускаем сайт на порту 5000
app.listen(5000);
console.log("Server started port: 5000");