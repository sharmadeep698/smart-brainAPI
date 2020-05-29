const express = require("express")
const bodyPraser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const knex = require("knex")

		const register = require('./Controllers/register')
		const signin = require('./Controllers/signin')
		const profile = require('./Controllers/profile')
		const image = require('./Controllers/image')
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'kamu',
    database : 'smartbrain'
  }
});
const app = express();
app.use(cors());
app.use(bodyPraser.json())

	
app.get('/',(req,res)=>{
	res.json(db.users);
})
app.post('/signin' ,(req,res) => {signin.handleSignin(req,res,db,bcrypt)})
 	

app.post('/register' ,(req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res) => {image.handleApi(req,res)})

app.listen(3000,()=>{
	console.log('helllooooo');
}) 