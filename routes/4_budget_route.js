var express = require('express');
const router = express.Router();

router.get('/budget', function(req, res){
    res.render('4_budget');
});

module.exports = router;