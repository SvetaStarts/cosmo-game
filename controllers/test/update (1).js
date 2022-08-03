const { ObjectId } = require("mongodb");

module.exports.update = function(request, response) {
    response.render('update', { title: 'Редактирование новости', layout:false});
}

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

const mongoClient = new MongoClient(url);

mongoClient.connect(function(err,client) {

    const db = client.db("cosmogame");
    const news = db.collection("news");

    news.updateOne(
        {name_news: 'news 2'},
        {$set: {text: 'NEW text for news 2'}},
        (err, result) => {
            if (err) {
                console.log('Не удалось обновить запись', err)
                throw err
            }
            console.log(news.findOne({name_news: 'news 2'}));
        }
    );
   
});
