const express=require('express');
const app=express();
const getUsStates=require('./getUsStates');

app.use(express.static('Public'));

app.use(
		(req,res,next)=>
						{
							res.header('Access-Control-Allow-Origin','*');
							res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
							if(req.method==='OPTIONS')
							{
								res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
								return res.status(200).json({}); 
							}
							next(); //so that the flow may continue
						}
	   );
app.get('/',
			(req,res)=>
				       {
				       	res.status(200).json("we dont have a slash route as of yet");
				       }
	   );
app.get(
		'/api/states',
				      async(req,res)=>
				      				   {
				      				   	const states=await getUsStates();
				      				   	res.json(states);
				      				   }
	   );
const port = process.env.PORT ||4242;
app.listen(port,()=>
					{
						console.log(`listening at http://localhost:${port}`)
					}
	 	  );