var express = require('express');
var router = express.Router();

/* GET home page. */
var markdown = require('markdown').markdown;

router.get('/', function(req, res, next) {
  Model('Article').find({}).populate('user').exec(function(err,articles){
    articles.forEach(function (article) {
      article.content = markdown.toHTML(article.content);
    });
    res.render('index', {title: '主页',articles:articles});
  });
});

module.exports = router;
