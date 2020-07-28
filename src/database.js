const mongoose = require('mongoose');
const URI = process.env.DB_MONGODB_URI
?process.env.DB_MONGODB_URI
:'mongodb://localhost/Error';
mongoose.connect(URI,{
	useUnifiedTopology: true,
	useNewUrlParser:true,
	useCreateIndex:true,
	useFindAndModify: false

});
const connection=mongoose.connection;
connection.once('open',(err)=>{
	if(err) return console.error(err)
	console.log("DB is connect");
});
