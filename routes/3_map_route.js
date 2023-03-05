var express = require('express');
const router = express.Router();

router.get('/map', function(req, res){
    var sql="SELECT * FROM avatars WHERE userId=?;";
    res.app.locals.pool.query(sql, [req.session.profile.userId], function(error,results,fields){
        var params={
            'profile': req.session.profile,
            'skin-color': results[0].skin,
            'shirt-color': results[0].shirt,
            'pants-color': results[0].pants,
            'shoes-color': results[0].shoes
        };
        res.render('3_map', params);
    });
});

router.get('/change_coins', function(req, res, next){
    const {amt} = req.query;
    console.log(amt);
    var sql = "SELECT coins FROM users WHERE userId=?";
    res.app.locals.pool.query(sql, [req.session.profile.userId], function(error, results, fields){
        res.locals.newcoins = results[0].coins + parseInt(amt);
        next();
    });
},
function(req, res, next){
    var sql = "UPDATE users SET coins=? WHERE userId=?";
    res.app.locals.pool.query(sql, [res.locals.newcoins, req.session.profile.userId], function(error, results, fields){
        next();
    });
},
function(req, res, next){
    var sql = "SELECT * FROM users WHERE userId=?;";
    res.app.locals.pool.query(sql, [req.session.profile.userId], function(error, results, fields){
        req.session.profile = results[0];
        res.send(""+res.locals.newcoins);
    });
});

router.get('/change_health', function(req, res, next){
    const {amt} = req.query;
    console.log("Change health: " + amt);
    var sql = "SELECT health FROM users WHERE userId=?";
    res.app.locals.pool.query(sql, [req.session.profile.userId], function(error, results, fields){
        res.locals.newhealth = results[0].health + parseInt(amt);
        next();
    });
},
function(req, res, next){
    var sql = "UPDATE users SET health=? WHERE userId=?";
    res.app.locals.pool.query(sql, [res.locals.newhealth, req.session.profile.userId], function(error, results, fields){
        next();
    });
},
function(req, res, next){
    var sql = "SELECT * FROM users WHERE userId=?;";
    res.app.locals.pool.query(sql, [req.session.profile.userId], function(error, results, fields){
        req.session.profile = results[0];
        res.send(""+res.locals.newhealth);
    });
});

router.get('/add_house', function(req, res, next){
    var sql = "UPDATE users SET hasHouse=1 WHERE userId=?";
    res.app.locals.pool.query(sql, [req.session.profile.userId], function(error, results, fields){
        res.send("Yes!");
    });
});

router.get('/change_month', function(req, res, next){
    const {newmonth} = req.query;
    var sql = "UPDATE users SET month=? WHERE userId=?";
    res.app.locals.pool.query(sql, [newmonth, req.session.profile.userId], function(error, results, fields){
        res.send("Yes!");
    });
})

module.exports = router;