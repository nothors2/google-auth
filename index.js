const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require("./passport-setup");

const cookieSession = require('cookie-session');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
 
//필히 app.use(passport.session()); 전에 작성
app.use(cookieSession({
    name: 'jame-session',
    keys:['key1','key2']
}))
app.use(passport.initialize());
app.use(passport.session());
 
const isLoggedIn = (req, res, next) => {
    console.log("####isLoggedIn", req.user);
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.get('/', (req, res) => { 
    res.send('Hello - You are not Logged in!');
}); 

app.get('/good',isLoggedIn, (req, res) => { 
    res.send(
        `<div> Welcom ${req.user.displayName}</div>
         <img src='${req.user.photos[0].value}'>
        `);
}); 

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/good');
  }
);

app.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  app.get('/failed', (req, res) => { 
    res.send('You Failed to log in');
}); 


app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
})

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Listening on port ${port}`));