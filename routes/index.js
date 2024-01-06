var express = require('express');
var router = express.Router();
var userModel = require('./users')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')


const isAuthenticated = async function(req,res,next){
 const token = req.cookies.token;
 
 if(token)
 {
  const decoded = jwt.verify(token,'iamdeveloper')
  req.user = await userModel.findById(decoded._id)

  next()
 }
 else{
  res.render('login')
 }
}




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile',isAuthenticated, function(req, res) {
  res.render('profile');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/login', function(req, res) {
  res.render('login');
});


router.post('/register',async function(req,res){
try{
  
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password,10)
  

const userData = await userModel.create({
  username:req.body.username,
  email:req.body.email,
  password:hashedPassword,
})

const token = jwt.sign({_id:userData._id},'iamdeveloper')

res.cookie('token',token,{
  httpOnly:true,
  expires:new Date(Date.now()+600000),
  secure:true,
})
res.render('profile')
}
catch(error)
{
  console.log(error)
  res.render('register',{error:'Something Went Wrong'})
}


})


router.post('/login',async function(req,res){

  const email = req.body.email;
  const password = req.body.password;


  const user = await userModel.findOne({email})

  if(!user) return res.render('login',{message:"incorrect email or password"})

  const isMatch = await bcrypt.compare(password,user.password)    

  if(!isMatch)
  {
    return res.render('login',{message:"incorrect email or password"})
  }
    
    const token = jwt.sign({_id:user._id},'iamdeveloper')

    res.cookie('token',token,{
      httpOnly:true,
      expires:new Date(Date.now()+600000)
    })
    res.render('profile')




})








router.get('/logout',function(req,res){
  
res.cookie('token',null,{
  expires:new Date(Date.now()),
  secure:false,
})
res.render('login')

})


module.exports = router;
