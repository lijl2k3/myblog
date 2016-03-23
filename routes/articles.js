/**
 * Created by lijl on 16-3-23.
 */

var express = require('express');
var router = express.Router();
router.get('/add', function (req, res) {
    res.render('article/add', { title: '·¢±íÎÄÕÂ' });
});

router.post('/add', function (req, res) {

});

module.exports = router;