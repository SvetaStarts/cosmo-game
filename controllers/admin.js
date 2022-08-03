const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const utils = require('../utils');

module.exports.exit = function(request, response) {

    // уадляем сессию
    request.session.destroy();

    // редеректим на страницу логина
    response.redirect("/login");
}


module.exports.admin = function(request, response) {

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    
    const mongoClient = new MongoClient(url);
    
    mongoClient.connect(function(err,client) {
    
        const db = client.db("cosmogame");
        const users = db.collection("users");

        let email = request.session.email;
        let stext = request.query.stext;


        users.findOne({ admin: "1", email }, (err, item) => {

            if(err || item == null) {
                response.redirect("/login");
            } else {
                let users = [];
                
                // если поисковая строка не пуста, ищем по ней
                if(typeof stext !== "undefined" && stext !== "") {
                    users = db.collection('users').find({ email: stext.trim() }).toArray();
                } else {
                    users = db.collection('users').find({}).toArray();
                }

                users.then((users) => {

                    // преобразуем дату в понятный вид
                    users.map(item => {

                        item["create_date"] = utils.formateDate(item.create_date);
                        
                        item["admin"] = item["admin"] == "1"?"<span class='warn'>Да</span>":"Нет";
                        item["blocked"] = item["blocked"] == "1"?"<span class='warn-dark'>Да</span>":"Нет";

                        return item;

                    });

                    // сохраняем имя админа
                    request.session.admin_name = item.name;


                    response.render('admin', { title: 'Админ-Панель', admin_name: item.name, users, stext });
                });
            }

        }); 
  
    });
}



module.exports.create = function(request, response) {

    let admin_name = request.session.admin_name;

    response.render('users/create', { title: 'Создание пользователя', admin_name });
}

module.exports.createAction = function(request, response) {


    let { name, email, password, admin, blocked } = request.body;

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    
    const mongoClient = new MongoClient(url);
    
    mongoClient.connect(function(err,client) {
    
        const db = client.db("cosmogame");
        const users = db.collection("users");

        // текущая дата в unix формате
        const create_date = Date.now() / 1000;

        // преобразуем значения чекбоксов
        admin = typeof admin !== "undefined"?"1":"0";
        blocked = typeof blocked !== "undefined"?"1":"0";
    
        users.insertOne(
            { name, email, password, create_date,  admin, blocked },
            (err, result) => {

                if(err) console.log('Не удалось создать запись', err)

                response.redirect("/admin");
            }
        );   
  
    });

}


module.exports.update = function(request, response) {

    // email из сессии (проверка авторизации)
    let s_email = request.session.email;
    if(typeof s_email === "undefined")  response.redirect("/login");


    let user_id = request.params.user_id;


    // создаём экземпляр класса MongoClient и передаём ему строку подключения
    const mongoClient = new MongoClient('mongodb://localhost:27017');
    mongoClient.connect(function(err, client) {
        if(err) {
            return console.log(err);
        }

        console.log("Подключение прошло успешно!");

        const db = client.db("cosmogame");
        const collection = db.collection("users");

        collection.findOne({  _id : new mongodb.ObjectId(user_id) } , (err, item) => {

            if(err) console.log('Не удалось получить запись', err)


           let { name, email, password } = item;

            
            // получаем имя админа
            admin_name = request.session.admin_name;

            console.log(item);


            response.render('users/update', { title: 'Редактирование пользователя', admin_name, name, email, password, user_id });

        });
  
    });
}

module.exports.updateAction = function(request, response) {


    let user_id = request.body.user_id.toString();

    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;


    // создаём экземпляр класса MongoClient и передаём ему строку подключения
    const mongoClient = new MongoClient('mongodb://localhost:27017');
    mongoClient.connect(function(err, client) {
        if(err) {
           return console.log(err);
        }

        console.log("Подключение прошло успешно!");

        const db = client.db("cosmogame");
        const users = db.collection("users");



        users.updateOne(
            {  _id : new mongodb.ObjectId(user_id) } ,
            { $set: {  name, email, password }},
          (err, res) => {
            if (err) {
                console.log('Не удалось обновить запись', err)
                throw err
            }

            console.log(res);
            if(res.modifiedCount == 0) {
                response.send("Не удалось обновить запись!");
            } else {
                response.redirect("/admin");
            }
           

        });
        

    });

}

module.exports.remove = function(request, response) {

    let user_id = request.params.user_id.toString();


    // создаём экземпляр класса MongoClient и передаём ему строку подключения
    const mongoClient = new MongoClient('mongodb://localhost:27017');
    mongoClient.connect(function(err, client) {
        if(err) {
           return console.log(err);
        }

        console.log("Подключение прошло успешно!");

        const db = client.db("cosmogame");
        const users = db.collection("users");



        users.deleteOne({  _id : new mongodb.ObjectId(user_id) } , (err, res) => {
            if (err) {
                console.log('Не удалось удалить запись', err)
                throw err
            }

            if(res.deletedCount == 0) {
                response.send("Не удалось удалить запись!");
            } else {
                response.redirect("/admin");
            }
           

        });

    });

  
}

module.exports.blocked = function(request, response) {

    let user_id = request.params.user_id.toString();

    // создаём экземпляр класса MongoClient и передаём ему строку подключения
    const mongoClient = new MongoClient('mongodb://localhost:27017');
    mongoClient.connect(function(err, client) {
        if(err) {
           return console.log(err);
        }

        console.log("Подключение прошло успешно!");

        const db = client.db("cosmogame");
        const users = db.collection("users");



        users.updateOne(
            {  _id : new mongodb.ObjectId(user_id) } ,
            { $set: {  blocked: '1' }},
          (err, res) => {
            if (err) {
                console.log('Не удалось обновить запись', err)
                throw err
            }

            console.log(res);
            if(res.modifiedCount == 0) {
                response.send("Не удалось обновить запись!");
            } else {
                response.redirect("/admin");
            }
           

        });

    });

}

module.exports.apiUsers = function(request, response) {
   // email из сессии
   let email = request.session.email;

   // создаём экземпляр класса MongoClient и передаём ему строку подключения
   const mongoClient = new MongoClient('mongodb://localhost:27017');
   mongoClient.connect(function(err, client) {
       if(err) {
           return console.log(err);
       }

       console.log("Подключение прошло успешно!");

       const db = client.db("cosmogame");
       const collection = db.collection("users");

       collection.findOne({ admin: "1", email }, (err, item) => {

           if(err || item == null) {
               response.redirect("/login");
           } else {
               var users = db.collection('users').find({}).toArray();

               users.then((users) => {

                   // преобразуем дату в понятный вид
                   users.map(item => {

                       var today = new Date(item.create_date * 1000);
                       var dd = String(today.getDate()).padStart(2, '0');
                       var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                       var yyyy = today.getFullYear();
                       
                       today = dd + '.' +  mm + '.' + yyyy;

                       item["create_date"] = today;
                       
                       item["admin"] = item["admin"] == "1"?"Да":"Нет";
                       item["blocked"] = item["blocked"] == "1"?"Да":"Нет";

                       return item;

                   });

                   // сохраняем имя админа
                   request.session.admin_name = item.name;


                   response.send(JSON.stringify({ admin_name: item.name, users }));
               });
           }

       });
 
   });
}