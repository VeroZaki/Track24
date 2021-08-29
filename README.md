# Track24
This project is an uptime monitoring RESTful API server which allows authorized users to enter URLs they want monitored, and get report about if this website is up or down.

# Features
## 1. Signup with Email verification
* The user sign's up with his Name, Email and password, the email is verified if it is in the correct formate or not and the password is confirmed if it's length six or more and it is compared to the confirm password to pan any mistakes from the user.
* The account (email) is verified according to a passcode or a token send to the user on the registered mail to verify the Email if it is fake or real and to verify that this mail belongs to this user.
* Passwords are hashed and saved to the database as to make account more controlable and secure.

## 2. Users can create a check to monitor a given URL if it is up or down
* The user can create a check to monitor a given URL if it is up or down. Each user has his own list of checks and each check is unique for the user, where he can put the chech name he wants for the recent check and enter the website URL he wants to check.

## 3. Users can edit, pause, or delete their checks if needed
* The user can pause the check, resume the check and even stop it, so he can enter a new URL for a new check.

## 4. Users receive email alerts whenever down checks or up checks exceed the number of the threshold defined by the user.
* The emails is sent throw SMTP Protocol and can send to any domain user side (gmail, yahoo, hotmail, etc.)

## 5. Users can check thier list of checks and can delete any check if he want
* The emails is sent throw SMTP Protocol and can send to any domain user side (gmail, yahoo, hotmail, etc.)

# Diagrams
## Entites Relation Diagram by Chen's
![alt text](https://github.com/VeroZaki/Track24/blob/main/Diagrams/Track24%20ERD.png)
Chen's database notition made on Microsoft Visio.
## Entites Relation Diagram by Crow's Foot
![alt text](https://github.com/VeroZaki/Track24/blob/main/Diagrams/Entites%20relation%20diagram.png)
Crow's Foot database notition made on Microsoft Visio.

# ScreenShots
## Track24 Welcome View
![alt text](https://github.com/VeroZaki/Track24/blob/main/Images/Track24%20Welcome%20View.png)
## Email Verification
![alt text](https://github.com/VeroZaki/Track24/blob/main/Images/Email%20Verification.PNG)
## Website Down
![alt text](https://github.com/VeroZaki/Track24/blob/main/Images/404.PNG)
## Website Up
![alt text](https://github.com/VeroZaki/Track24/blob/main/Images/200.PNG)

# Dependencies
```
"dependencies": {
    "axios": "^0.21.1",
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "express-generator": "^4.16.1",
    "express-session": "^1.17.2",
    "firebase-admin": "^9.11.1",
    "hbs": "^4.1.2",
    "http-errors": "~1.6.3",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.0",
    "morgan": "~1.9.1",
    "nodemailer": "^6.6.3",
    "nodemailer-smtp-transport": "^2.7.4",
    "pushover-notifications": "^1.2.2",
    "randomstring": "^1.2.1",
    "url": "^0.11.0"
  }
```
