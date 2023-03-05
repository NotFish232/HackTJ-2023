var express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('1_homepage', {'func': "show_login()", 'message': 'Have an account? Log in instead!'});
});
router.get('/login-box', function(req, res){
    res.render('1_login_box');
});
router.get('/signup', function(req, res){
    email = req.query.username;
    password = req.query.password;
    username = "hello";
    var sql="CALL addUser(?,?,?);";
    console.log("Calling add user.");
    res.app.locals.pool.query(sql, [username, email, password], function(error, results, fields){
        console.log(results);
        if(results!==undefined && results[0]!==undefined){
            req.session.profile = results[0][0];
            res.redirect('./menu')
        }
        else{
            res.render('1_homepage', {'func': "show_login()", 'message': "There is an account associated with this username. Log in?"});
        }
    });
});
router.get('/login', function(req, res, next){
    const {email, password} = req.query;
    console.log(email);
    var sql="SELECT * FROM users WHERE email = ?;";
    res.app.locals.pool.query(sql, [email], function(error, results, fields){
        if(results!==undefined && results[0] !==undefined){
            console.log("HERE");
            console.log(results);
            req.session.profile = results[0];
            res.locals.password = password;
            next();
        }
        else{
            res.render('1_homepage', {'func': "show_signup()", 'message': "This email does not exist. Create an account?"});
            return;
        }
    });
},
function(req, res, next){
    var sql="SELECT password FROM users WHERE userId=?;";
    res.app.locals.pool.query(sql, [req.session.profile.userId], function(error, results, fields){
        if(results[0].password==res.locals.password){
            res.redirect('./menu');
        }
        else{
            res.render('1_homepage', {'func': "show_login()", 'message': "Password is incorrect. Try again?"});
        }
    });
});
router.get('/signup-box', function(req, res){
    res.render('1_signup_box');
});

module.exports = router;