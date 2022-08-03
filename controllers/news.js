const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const utils = require('../utils');

module.exports.news = function(request, response) {

    // email из сессии (проверка авторизации)
    let s_email = request.session.email;
    if(typeof s_email === "undefined")  response.redirect("/login");

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    
    const mongoClient = new MongoClient(url);
    
    mongoClient.connect(function(err,client) {
    
        const db = client.db("cosmogame");
        const news = db.collection('news').find({}).toArray();
  
        news.then((list) => {

            // преобразуем дату в понятный вид
            list.map(item => {

                item["create_date"] = utils.formateDate(item.create_date);

                return item;

            });

            // получаем имя админа
            let admin_name = request.session.admin_name;

            response.render('news/list', { title: 'Админ-Панель / Новости', admin_name, news: list });
            
        });
  
    });
}



module.exports.create = function(request, response) {

    let admin_name = request.session.admin_name;

    response.render('news/create', { title: 'Пользователь', admin_name });
}

module.exports.createAction = function(request, response) {


    let {title, text} = request.body;

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    
    const mongoClient = new MongoClient(url);
    
    mongoClient.connect(function(err,client) {
    
        const db = client.db("cosmogame");
        const news = db.collection("news");

        // текущая дата в unix формате
        const create_date = Date.now() / 1000;
      
    
        news.insertOne(
            {title, text, create_date},
            (err, result) => {

                if(err) 
                    console.log('Не удалось создать запись', err);

                response.redirect("/news")
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
        const news= db.collection("news");

        news.findOne({  _id : new mongodb.ObjectId(user_id) } , (err, item) => {

            if(err) console.log('Не удалось получить запись', err)


           let {title, text, create_date } = item;

            
            // получаем имя админа
            admin_name = request.session.admin_name;

            console.log(item);


            response.render('news/update', {admin_name, user_id, title, text, create_date});

        });
  
    });
}

module.exports.updateAction = function(request, response) {


    let user_id = request.body.user_id.toString();

    let title = request.body.title;
    let text = request.body.text;
    let create_date = request.body.create_date;


    // создаём экземпляр класса MongoClient и передаём ему строку подключения
    const mongoClient = new MongoClient('mongodb://localhost:27017');
    mongoClient.connect(function(err, client) {
        if(err) {
           return console.log(err);
        }

        console.log("Подключение прошло успешно!");

        const db = client.db("cosmogame");
        const news = db.collection("news");

        create_date = Date.now() / 1000;

        news.updateOne(
            {  _id : new mongodb.ObjectId(user_id) } ,
            { $set: {title, text, create_date}},
          (err, res) => {
            if (err) {
                console.log('Не удалось обновить запись', err);
                throw err
            }

            console.log(res);
            if(res.modifiedCount == 0) {
                response.send("Не удалось обновить запись!");
            } else {
                response.redirect("/news");
            }
           

        });
        

    });

}

module.exports.remove = function(request, response) {

    let user_id = request.params.user_id.toString();

    /*response.send(user_id);*/

    // создаём экземпляр класса MongoClient и передаём ему строку подключения
    const mongoClient = new MongoClient('mongodb://localhost:27017');
    mongoClient.connect(function(err, client) {
        if(err) {
           return console.log(err);
        }

        console.log("Подключение прошло успешно!");

        const db = client.db("cosmogame");
        const news = db.collection("news");



        news.deleteOne({  _id : new mongodb.ObjectId(user_id) } , (err, res) => {
            if (err) {
                console.log('Не удалось удалить запись', err)
                throw err
            }

            if(res.deletedCount == 0) {
                response.send("Не удалось удалить запись!");
            } else {
                response.redirect("/news");
            }
           

        });

    });
  
}

module.exports.apiNews = function(request, response) {
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
               var news = db.collection('news').find({}).toArray();

               news.then((news) => {

                   // преобразуем дату в понятный вид
                   news.map(item => {

                       var today = new Date(item.create_date * 1000);
                       var dd = String(today.getDate()).padStart(2, '0');
                       var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                       var yyyy = today.getFullYear();
                       
                       today = dd + '.' +  mm + '.' + yyyy;

                       item["create_date"] = today;
                       
                     /*  item["admin"] = item["admin"] == "1"?"Да":"Нет";
                       item["blocked"] = item["blocked"] == "1"?"Да":"Нет";*/

                       return item;

                   });

                   // сохраняем имя админа
                   request.session.admin_name = item.name;


                   response.send(JSON.stringify({ news }));
               });
           }

       });
 
   });
}