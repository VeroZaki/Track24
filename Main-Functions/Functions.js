const con = require('../database/connect');
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const { token } = require('morgan');
var statustext;

//-------------------------------------------------Save the Checking of the URL in Database--------------------------------------------//

function SaveCheck(url, email, stat, checkname) {
    var sql = 'insert into urlschema(url,email,statuscode,checkname) values(?,?,?,?);';
    con.query(sql, [url, email, stat, checkname], function (err, result, fields) {
        if (err) throw err;
        else {
            console.log("success")
        }
    });
};
//--------------------------------------------sending Mail to tell if website is up or down---------------------------------------------//

function SendingMail(url, status, email) {
    console.log(typeof (status));
    if (status == 200) {
        statustext = "up";
    }
    else if (status == 404) {
        statustext = "down";
    }
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mytracker246@gmail.com',
            pass: 'Tracker24##',
        },
    });

    let info = transporter.sendMail({
        from: 'mytracker246@gmail.com',
        to: email,
        subject: `The required site is ${statustext}`,
        text: `${url} is ${statustext} with status ${status}`
    });

    console.log("Message sent: %s", info.messageId);
};

//------------------------------------------------sending Mail to get the verfication Code---------------------------------------------//

function SendingVerifyMail(token, email) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mytracker246@gmail.com',
            pass: 'Tracker24##',
        },
    });

    let info = transporter.sendMail({
        from: 'mytracker246@gmail.com',
        to: email,
        subject: "Mail Verification",
        html: `Hi our dear user,
        <br/>
        Thank you for your intrest in using Track24
        <br/><br/>
        Please verify your Email by typing the following token:
        <br/>
        Token: <b>${token}</b>
        <br/>
        on the following page:
        <a href="http://localhost:3000/verify">http://localhost:3000/verify</a>
        <br/><br/>
        We are waiting for you, Have a nice day.`
    });

    console.log("Message sent: %s", info.messageId);
};

// function pushoverMess(){
//     var serviceAccount = require("../track24-1d93b-firebase-adminsdk-ijpt4-116ca5b138.json");
//     var registrationToken = ""
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount)
//     });


//     // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCjKfiiuUDADdBeHpm1LKZtyz1DTEddNZQ",
//   authDomain: "track24-1d93b.firebaseapp.com",
//   projectId: "track24-1d93b",
//   storageBucket: "track24-1d93b.appspot.com",
//   messagingSenderId: "994729118294",
//   appId: "1:994729118294:web:3e1ac82b7db048be61c9f7",
//   measurementId: "G-RRRM2R2399"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// };


module.exports = {
    SaveCheck: SaveCheck,
    SendingMail: SendingMail,
    SendingVerifyMail: SendingVerifyMail
    //CalcUpTimes:CalcUpTimes
};