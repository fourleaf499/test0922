var express = require('express');
var router = express.Router();
const fs = require('fs');


let userData = {};
filepath2 = "user.json";

fs.readFile(filepath2,'utf8',(err,data) => {
  if (err) {
    console.error('Error reading user data:',err);
  } else {
    userData = JSON.parse(data);
  }
});


/* GET users listing. */
router.post('/login', (req, res) => {
  const {username,password} = req.body;
  

  if (userData[username] && userData[username] === password){
    console.log(req.session);
    req.session.user = {'username':username};
    res.json({
      message:'Login successful',
      username: req.session.user.username,
    });
  } else {
    res.status(401).send('Invalid username or password');
  }
});

router.post('/logout',(req,res) =>{
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Faild to Logout.');
    }
    res.send('Logged out successfuly!');
  });
});

module.exports = router;
