module.exports.create = function(request, response) {
    response.render('create', { title: 'Создание новости', layout:false});
}
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

const mongoClient = new MongoClient(url);

mongoClient.connect(function(err,client) {

    const db = client.db("cosmogame");
    const news = db.collection("news");

   news.insertOne(
       {id: 1, name_news: 'news 4', text: 'text for news 4'},
       (err, result) => {
           console.log('Не удалось создать запись', err)
           throw err
       }
   );   
});
