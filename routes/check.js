var express = require('express');
var router = express.Router();
var con = require('../database/connect');
const axios = require('axios').default;
var Push = require('pushover-notifications')
const url = require('url');
var Functions = require('../Main-Functions/Functions');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var isPaused = false;
var isSaved = false;
var URLInterval;
let Time = 0;

//-----------------------------------------------------Checking the Website URL-----------------------------------------------------//

router.post('/CheckURL', (req, res, next) => {
    const url = req.body.url;
    const checkname = req.body.checkname;
    const threshold = req.body.threshold;

    if (!url) return res.redirect("welcome");
    console.log(url)
    if (req.session.email != null) {

        URLInterval = setInterval(async () => {
            await axios.get(url).then(response => {
                console.log("Pause - ", isPaused)
                if (!isPaused) {
                    Time = Time + 1;
                    if (!isSaved) {
                        isSaved = true;
                        Functions.SaveCheck(url, req.session.email, response.status, checkname);
                    }
                    console.log(response.status);
                    if (Time == threshold) {
                        Functions.SendingMail(url, response.status, req.session.email);
                        Time = 0;
                    }
                }
            }).catch(async error => {
                try {
                    if (!isPaused) {
                        Time = Time + 1;
                        console.log(url, '-', error.response.status);
                        if (!isSaved) {
                            isSaved = true;
                            Functions.SaveCheck(url, req.session.email, error.response.status, checkname);
                        }
                        if (Time == threshold) {
                            Functions.SendingMail(url, error.response.status, req.session.email);
                            Time = 0;
                        }
                    }
                } catch (e) {
                    console.error(e)
                }
            });

        }, 10000)
    }
    else {
        console.log("There is no Email");
        req.session.flag = 5;
        res.redirect('/');
    }

});

//-----------------------------------------------------Pause the Checking of the URL--------------------------------------------------//

router.post('/pause', (req, res, next) => {
    isPaused = true;
    res.redirect('/welcome')
});
//-----------------------------------------------------resume the Checking of the URL-------------------------------------------------//

router.post('/resume', (req, res, next) => {
    isPaused = false;
    res.redirect('/welcome')
});
//-----------------------------------------------------stop the Checking of the URL---------------------------------------------------//

router.post('/stop', (req, res, next) => {
    stop = true;
    isSaved = false;
    Time = 0;
    clearInterval(URLInterval);
    res.redirect('/welcome')
});
//-----------------------------------------------------show the Checking list-----------------------------------------------------------//

router.post('/show', (req, res, next) => {
    var sql = 'SELECT * FROM urlschema WHERE email = ?;';
    con.query(sql, [req.session.email], function (err, result) {
        if (err) throw err;
        var string = JSON.stringify(result);
        var json = JSON.parse(string);
        console.log('>> json: ', json);
        req.list = json;
        res.render('checks', { title: 'Track24', checks: json });
    });
});

router.get('/check', (req, res, next) => {
    res.render('checks', { title: 'Track24' });
});
//-----------------------------------------------------Returning back to the check page-------------------------------------------------//

router.post('/back', (req, res, next) => {
    res.redirect('/welcome');
});
//-----------------------------------------------------Delete a check ------------------------------------------------------------------//

router.post('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    console.log(id)
    var sql = "DELETE FROM urlschema WHERE id = ?;";
    con.query(sql, [id], function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });
    res.redirect('/welcome');
});

module.exports = router;