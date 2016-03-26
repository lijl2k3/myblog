/**
 * Created by lijl on 2016/3/25.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./models');
var settings = require('../settings');
mongoose.connect(settings.url);
mongoose.model('User', new Schema(models.User));
mongoose.model('Article', new Schema(models.Article));
global.Model = function (type) {
    return mongoose.model(type);;
}