var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var con = require('../database/connect');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
var Functions = require('../Main-Functions/Functions');
const JWT_SECRET = 'hd@03ku#$%3i1am12cbyw#$yrbks&*&%^xubs@jddsj$#%3hbg32ds74!@#%$&%whsbyfrbh%$^y7'


//--------------------------------------------------------Redirect to SignUp Page--------------------------------------------------------//

router.get('/', function (req, res, next) {
  if (req.session.flag == 1) {
    req.session.destroy();
    res.render('index', { title: 'Track24', message: 'Email Already Exists', flag: 1 });
  }
  else if (req.session.flag == 2) {
    req.session.destroy();
    res.render('index', { title: 'Track24', message: 'Registration Done. Please Login.', flag: 0 });
  }
  else if (req.session.flag == 3) {
    req.session.destroy();
    res.render('index', { title: 'Track24', message: 'Confirm Password Does Not Match.', flag: 1 });
  }
  else if (req.session.flag == 4) {
    req.session.destroy();
    res.render('index', { title: 'Track24', message: 'Incorrect Email or Password.', flag: 1 });
  }
  else if (req.session.flag == 5) {
    req.session.destroy();
    res.render('SignIn', { title: 'Track24', message: 'Session has ended! Please sign in again.', flag: 1 });
  }
  else if (req.session.flag == 6) {
    req.session.destroy();
    res.render('index', { title: 'Track24', message: 'Password length must be 6 or more!', flag: 1 });
  }
  else if (req.session.flag == 7) {
    req.session.destroy();
    res.render('verify', { title: 'Track24', message: 'You must verify your Email first', flag: 1 });
  }
  else if (req.session.flag == 8) {
    req.session.destroy();
    res.render('SignIn', { title: 'Track24', message: 'The Email is been Verified you can login.', flag: 0 });
  }
  else if (req.session.flag == 9) {
    req.session.destroy();
    res.render('SignIn', { title: 'Track24', message: 'This mail has been already verified! login', flag: 1 });
  }
  else if (req.session.flag == 10) {
    req.session.destroy();
    res.render('index', { title: 'Track24', message: 'Not a User!! Please Signup', flag: 1 });
  }
  else if (req.session.flag == 11) {
    req.session.destroy();
    res.render('index', { title: 'Track24', message: 'Please Login first!', flag: 1 });
  }
  else {
    res.render('index', { title: 'Track24' });
  }

});

//--------------------------------------------------------Redirect to SignIn Page--------------------------------------------------------//

router.get('/SignIn', (req, res, next) => {
  res.render('SignIn');
});

//----------------------------------------------------User Registration Authentication---------------------------------------------------//

router.post('/auth_reg', function (req, res, next) {

  var username = req.body.username;
  var email = req.body.usermail;
  var password = req.body.userpass;
  var cpassword = req.body.userpassConfirm;

  const secretToken = randomstring.generate();


  if (password.length >= 6) {
    if (cpassword == password) {

      var sql = 'select * from users where email = ?;';
      con.query(sql, [email], function (err, result, fields) {
        if (err) throw err;

        if (result.length > 0) {
          req.session.flag = 1;
          res.redirect('/');
          return;

        } else {
          var authsql = 'insert into authuser(email,token,active) values(?,?,?);';

          con.query(authsql, [email, secretToken, false], function (err, result, fields) {
            if (err) throw err;
          });

          var hashpassword = bcrypt.hashSync(password, 10);
          var sql = 'insert into users(username,email,password) values(?,?,?);';

          con.query(sql, [username, email, hashpassword], function (err, result, fields) {
            if (err) throw err;
            req.session.flag = 2;
            req.session.email = email;
            Functions.SendingVerifyMail(secretToken, email);
            res.render('verify');
          });
        }
      });
    } else {
      req.session.flag = 3;
      res.redirect('/');
    }
  } else {
    req.session.flag = 6;
    res.redirect('/');
  }
});

//-----------------------------------------------------Redirect to Welcome Home Page-----------------------------------------------------//

router.get("/welcome", (req, res) => {
  console.log(req.session.email)
  if (req.session.email != undefined) {
    res.render('welcome', { title: 'Track24', message: 'Welcome 🙌, ' + req.session.email });
  }
  else {
    req.session.flag = 11;
    res.redirect('/');
  }
});

// router.get("/welcome/:status", (req, res) => {
//   console.log('in homeee');
//   res.render('welcome', { title: 'Track24', message : 'Welcome 🙌, ' + req.session.email , status: req.params.status});
// });

//---------------------------------------------------Redirect to SignIn Authentication---------------------------------------------------//

router.post('/auth_login', function (req, res, next) {

  var email = req.body.username;
  var password = req.body.userpass;
  var sqlverify = 'SELECT active FROM authuser WHERE email = ?;';
  con.query(sqlverify, [email], function (err, result) {
    if (err) throw err;
    console.log(result)
    if (result[0].active == 0) {
      req.session.flag = 7;
      res.redirect('/');
    }
    else {
      var sql = 'select * from users where email = ?;';
      con.query(sql, [email], (err, result, fields) => {
        if (err) throw err;
        if (result.length && bcrypt.compareSync(password, result[0].password)) {
          //Create token
          let token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });
          req.session.email = email;
          res.redirect('/welcome');

        } else {
          req.session.flag = 4;
          res.redirect('/');
        }
      });
    }
  });

});

//---------------------------------------------------Redirect to verify Token Page------------------------------------------------------//

router.get('/verify', function (req, res, next) {
  res.render('verify');
});

//---------------------------------------------------Redirect to Verify Token Authentication--------------------------------------------//

router.post('/verifyToken', function (req, res, next) {
  var Token = req.body.Token;
  var sqlverify = 'SELECT * FROM authuser WHERE token = ?;';
  con.query(sqlverify, Token, function (err, result) {
    if (err) throw err;
    if (result == '') {
      req.session.flag = 10;
      res.redirect('/');
    }
    else {
      if (result[0].active == 0) {
        var sql = "UPDATE authuser SET active = '1' WHERE token = ?;";
        con.query(sql, [Token], function (err, result) {
          if (err) throw err;
          req.session.flag = 8;
          res.redirect('/');

        });
      } else {
        req.session.flag = 9;
        res.redirect('/');
      }
    }
  });
});

//-----------------------------------------------------Logout to redirect to SignUp page-------------------------------------------------//
router.get('/logout', function (req, res, next) {
  if (req.session.email) {
    req.session.destroy();
    res.render('SignIn');
  }
});

//-----------------------------------------------------JWT Not working-----------------------------------------------------//

function ensuretoken(req, res, next) {

  let token = req.headers['authorization'];
  if (typeof token !== 'undefined') {
    token = token.split(' ')[0];

    jwt.verify(token, JWT_SECRET, (error, result) => {
      if (!error) {
        req.result = result;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
