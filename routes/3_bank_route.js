var express = require('express');
const router = express.Router();

router.get('/bank', function(req, res){
    res.render('3_bank', {'profile': req.session.profile});
});

router.get('/change_savings', function(req, res, next){
    const {amt} = req.query;
    var sql = "UPDATE users SET stocks=? WHERE userId=?;";
    res.app.locals.pool.query(sql, [parseInt(amt), req.session.profile.userId], function(error, results, fields){
        next();
    });
}, 
function(req, res, next){
    var sql = "SELECT * FROM users WHERE userId=?;";
    res.app.locals.pool.query(sql, [req.session.profile.userId], function(error, results, fields){
        req.session.profile = results[0];
        res.send("YES");
    });
});
module.exports = router;