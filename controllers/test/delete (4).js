module.exports.news = function(request, response) {
    response.render('news', { title: 'Новости'});
}

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

const mongoClient = new MongoClient(url);

mongoClient.connect(function(err, client) {

    const db = client.db("cosmogame");
    const news = db.collection("news");

    news.deleteOne({name_news: "news 1"}, (err, res) => {
        if (err) {
            console.log('Не удалось удалить запись', err)
            throw err
        }
    })

 
   
});