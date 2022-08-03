
module.exports.apiGameRoomsMessages = function(request, response) {

    // email из сессии (проверка авторизации)
    let s_email = request.session.email;
    if(typeof s_email === "undefined")  response.send( JSON.stringify({status:"auth_error"}) );

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    
    const mongoClient = new MongoClient(url);
    
    mongoClient.connect(function(err,client) {
    
        const db = client.db("cosmogame");
        const messages = db.collection('messages').find({}).toArray();
  
        messages.then((list) => {

            response.send( JSON.stringify({messages:list}) );
            
        });
  
    });
}
module.exports.apiAddMessage = function(request, response) {

    // email из сессии (проверка авторизации)
    let s_email = request.session.email;
    if(typeof s_email === "undefined")  response.send( JSON.stringify({status:"auth_error"}) );

    console.log(request.body);

    let {game_room_id, message} = request.body;

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    
    const mongoClient = new MongoClient(url);
    
    mongoClient.connect(function(err,client) {
    
        const db = client.db("cosmogame");
        const messages = db.collection("messages");

    
        messages.insertOne(
            {game_room_id, message},
            (err, result) => {

                if(err) console.log('Не удалось создать запись', err)

                response.send( JSON.stringify({status:"ok"}) );
            }
        );   
  
    });

}

