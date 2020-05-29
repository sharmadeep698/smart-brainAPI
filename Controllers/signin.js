
const handleSignin = (req,res,db,bcrypt) =>{
const {email,password} = req.body
if ( !email || !password){
	return res.status(400).json("Invalid Format")
}
db.select('email','hash').from('login')
.where('email','=',email)
	.then(data =>{
			const isValid = bcrypt.compareSync(password,data[0].hash);
			
			if (isValid){
				return db.select('*').from('users')
					.where('email','=',email)
					.then(user=>{
					res.json(user[0])
					})
				} else{
					res.status(400).json("Invalid username or password")
				}
			})

	.catch(err=> res.status(404).json("error while finding file "))
}
module.exports={
	handleSignin:handleSignin
	}