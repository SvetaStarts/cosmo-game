const utils = require('../utils');

module.exports.apiGameRooms = function(request, response) {

    // email из сессии (проверка авторизации)
    let s_email = request.session.email;
    if(typeof s_email === "undefined")  response.send( JSON.stringify({status:"auth_error"}) );

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    
    const mongoClient = new MongoClient(url);
    
    mongoClient.connect(function(err,client) {
    
        const db = client.db("cosmogame");
        const game_rooms = db.collection('game_rooms').find({}).toArray();
  
        game_rooms.then((list) => {

            // преобразуем дату в понятный вид
            list.map(item => {

                item["create_date"] = utils.formateDate(item.create_date);

                return item;

            });

            response.send( JSON.stringify({game_rooms: list}) );
            
        });
  
    });
}

module.exports.apiCreate = function(request, response) {

    // email из сессии (проверка авторизации)
    let s_email = request.session.email;
    if(typeof s_email === "undefined")  response.send( JSON.stringify({status:"auth_error"}) );

    console.log(request.body);

    let { name, max_count } = request.body;

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    
    const mongoClient = new MongoClient(url);
    
    mongoClient.connect(function(err,client) {
    
        const db = client.db("cosmogame");
        const game_rooms = db.collection("game_rooms");

        // текущая дата в unix формате
        const create_date = Date.now() / 1000;
    
        game_rooms.insertOne(
            { name, max_count, create_date },
            (err, result) => {

                if(err) console.log('Не удалось создать запись', err)

                response.send( JSON.stringify({status:"ok"}) );
            }
        );   
  
    });

}