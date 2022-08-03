const MongoClient = require("mongodb").MongoClient;

module.exports.login = function(request, response) {
    response.render('login', { title: 'Вход в Админ-Панель', layout:false});
}

module.exports.loginAction = function(request, response) {

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
        const collection = db.collection("users");

        collection.findOne({ admin: "1", email: email, password }, (err, item) => {

            if(err || item == null) {
                response.render('login', { title: 'Вход в Админ-Панель', error: "Ошибка авторизации!", layout:false});
            } else {

                request.session.email = email;

                response.redirect("/admin");
            }

        });
  
    })

}
