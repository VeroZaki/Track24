# Track24
This project is an uptime monitoring RESTful API server which allows authorized users to enter URLs they want monitored, and get report about if this website is up or down.

# Features
## 1. Signup with Email verification
* The user sign's up with his Name, Email and password, the email is verified if it is in the correct formate or not and the password is confirmed if it's length six or more and it is compared to the confirm password to pan any mistakes from the user.
* The account (email) is verified according to a passcode or a token send to the user on the registered mail to verify the Email if it is fake or real and to verify that this mail belongs to this user.
* Passwords are hashed and saved to the database as to make account more controlable and secure.

## 2. Users can create a check to monitor a given URL if it is up or down
