var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/reg', function (req, res) {
  res.render('user/reg', {title: 'ע��'});
});

/**
 * ����д�û�ע����Ϣ�ύʱ�Ĵ���
 */
router.post('/reg', function (req, res) {
});

/**
 * ��ʾ�û���¼��
 */
router.get('/login', function (req, res) {
  res.render('user/login', {title: '��¼'});
});

/**
 * ����д�û���¼��Ϣ�ύʱ�Ĵ���
 */
router.post('/login', function (req, res) {
});

router.get('/logout', function (req, res) {
});

module.exports = router;
