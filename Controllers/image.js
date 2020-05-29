
const Clarifai = require("clarifai") 

const app = new Clarifai.App({
	apiKey:"88102a5fec0a4a5695d624bb42841559"

})
const handleApi = (req,res) => {
	const {input} = req.body;
	app.models
	.predict( Clarifai.FACE_DETECT_MODEL,input)
	.then(data => {
		res.json(data);
	})
	.catch(err=>res.status(400).json("unable to conect to the API "))
 	}
 const handleImage = (req,res,db)=>{
	const { id } = req.body;
	let found = false ; 
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(response =>{
		res.json(response[0])
	})
.catch(err =>{
		res.status(400).json("Entries not found In DataBase")
	})

}
module.exports={
	handleImage,
	handleApi
	}