
module.exports.apiGameRoomsMembers = function(request, response) {

    // email из сессии (проверка авторизации)
    let s_email = request.session.email;
    if(typeof s_email === "undefined")  response.send( JSON.stringify({status:"auth_error"}) );

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    
    const mongoClient = new MongoClient(url);
    
    mongoClient.connect(function(err,client) {
    
        const db = client.db("cosmogame");
        const members = db.collection('members').find({}).toArray();
  
        members.then((list) => {

            response.send( JSON.stringify({members:list}) );
            
        });
  
    });
}
module.exports.apiAddMemberGameRoom = function(request, response) {

    // email из сессии (проверка авторизации)
    let s_email = request.session.email;
    if(typeof s_email === "undefined")  response.send( JSON.stringify({status:"auth_error"}) );

    console.log(request.body);

    let {game_room_id, name} = request.body;

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    
    const mongoClient = new MongoClient(url);
    
    mongoClient.connect(function(err,client) {
    
        const db = client.db("cosmogame");
        const members = db.collection("members");

    
        members.insertOne(
            {game_room_id, name},
            (err, result) => {

                if(err) console.log('Не удалось создать запись', err)

                response.send( JSON.stringify({status:"ok"}) );
            }
        );   
  
    });

}
module.exports.apiRemoveMemberGameRoom = function(request, response) {

    // email из сессии (проверка авторизации)
    let s_email = request.session.email;
    if(typeof s_email === "undefined")  response.send( JSON.stringify({status:"auth_error"}) );

    console.log(request.body);

    let {game_room_id} = request.body;

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    
    const mongoClient = new MongoClient(url);
    
    mongoClient.connect(function(err,client) {
    
        const db = client.db("cosmogame");
        const members = db.collection("members");

    
        members.deleteOne(
            {game_room_id},
            (err, result) => {

                if(err) console.log('Не удалось создать запись', err)

                response.send( JSON.stringify({status:"ok"}) );
            }
        );   
  
    });

}

