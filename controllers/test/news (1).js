module.exports.news = function(request, response) {
    response.render('news', { title: 'Новости'});
}

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

const mongoClient = new MongoClient(url);

mongoClient.connect(function(err, client) {

    const db = client.db("cosmogame");
    const news = db.collection("news");

    news.countDocuments(function(err, result) {
        if (err) {
            return console.log(err);
        }
        console.log(`В коллекции news ${result} документов`);
        
        client.close();
    });

    //Находим данные коллеции news

    let cursor = db.collection('news').find({});
    cursor.toArray((err, res) => {
    
        console.log(res);
    });
   
});



   

