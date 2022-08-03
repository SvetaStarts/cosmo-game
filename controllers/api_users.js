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
        const users = db.collection('users').find({}).toArray();
  
        users.then((list) => {

            // преобразуем дату в понятный вид
            list.map(item => {

                item["create_date"] = utils.formateDate(item.create_date);

                return item;

            });

            response.send( JSON.stringify({users:list}) );
            
        });
  
    });
}