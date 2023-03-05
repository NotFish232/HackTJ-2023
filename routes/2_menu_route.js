var express = require('express');
const router = express.Router();

router.get('/menu', function(req, res){
    var sql="SELECT * FROM avatars WHERE userId=?;";
    res.app.locals.pool.query(sql, [req.session.profile.userId], function(error,results,fields){
        var params={
            'profile': req.session.profile,
            'skin-color': results[0].skin,
            'shirt-color': results[0].shirt,
            'pants-color': results[0].pants,
            'shoes-color': results[0].shoes
        };
        res.render('2_menu', params);
    });
});
router.get('/avatar', function(req, res){
    console.log(req.query);
    var newInfo="";
    Object.keys(req.query).forEach(function(elem){
        newInfo+=elem+":"+req.query[elem]+";";
    });
    var sql="CALL updateAvatar(?,?);";
    res.app.locals.pool.query(sql, [req.session.profile.userId, newInfo], function(error, results, fields){
        res.send("yay");
    });
});

module.exports = router;