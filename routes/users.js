var express = require('express');
var router = express.Router();

function md5(val){
  return require('crypto').createHash('md5').update(val).digest('hex');
}


router.get('/reg',middleware.checkNotLogin, function (req, res) {
  res.render('user/reg', {title: '注册'});
});

/**
 * 当填写用户注册信息提交时的处理
 */
router.post('/reg', function (req, res) {
  var user = req.body;//
  if(user.password != user.repassword){
    req.flash('error','两次输入的密码不一致');
    return res.redirect('/users/reg');
  }
  delete user.repassword;
  user.password = md5(user.password);
  user.avatar = "https://secure.gravatar.com/avatar/"+md5(user.email)+"?s=48";
  new Model('User')(user).save(function(err,user){
    if(err){
      req.flash('error',err);
      return res.redirect('/users/reg');
    }
    req.session.user = user;
    res.redirect('/');
  });
});

/**
 * 显示用户登录表单
 */
router.get('/login', function (req, res) {
  res.render('user/login', {title: '登录'});
});

/**
 * 当填写用户登录信息提交时的处理
 */
router.post('/login', function (req, res) {
  var user = req.body;
  user.password = md5(user.password);
  Model('User').findOne(user,function(err,user){
    if(err){
      req.flash('error',err);
      return res.redirect('/users/login');
    }
    req.session.user = user;
    res.redirect('/');
  });
});

router.get('/logout', function (req, res) {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
