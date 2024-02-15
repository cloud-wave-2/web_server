const path = require('path');

const express = require('express');

const axios = require('axios');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res){
    res.render('home');
});

app.get('/login', function(req, res){
  res.render('loginForm');
});

app.post('/login', function(req, res){
  info = {"user_id": req.body.user_id, 
              "user_pw": req.body.user_pw};
  console.log(info['user_id']);
  console.log(info['user_pw']);
  res.redirect('/');
});

app.get('/joinAgreeForm', function(req, res){
    res.render('joinAgreeForm');
});

app.get('/joinForm', function(req, res){
    res.render('joinForm');
});

app.get('/prdmain', function(req, res){
  res.render('prdmain');
});

app.post('/joinForm', function(req, res){
  info = {"user_id:": req.body.user_id, 
  "user_pw": req.body.user_pw, 
  "user_name": req.body.user_name, 
  "email": req.body.user_email1,
  "email": req.body.user_email2};

  console.log(req.body.user_id);
  console.log(req.body.user_pw);
  console.log(req.body.user_name);
  console.log(req.body.user_email1);
  console.log(req.body.user_email2);
  res.redirect('/');
});

app.post('/purchase', async (req, res) => {
  var info = [
    req.body.product, 
    req.body.price, 
    'cloud'
  ];
  console.log(info);

  
  try {
      // Replace with the actual URL of your WAS, e.g., 'http://192.168.1.2:4000/user-data'
      const response = await axios.post(`http://10.0.3.202:4000/purchase`, {data: info});
      res.redirect('/prdmain');
      console.log("purchase completed: (" + response.data + ")");
  } catch (error) {
      res.status(500).send('Error querying WAS: ' + error.message);
  }
});

app.listen(3000);

