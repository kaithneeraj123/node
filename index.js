const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect("mongodb+srv://neeraj:neeraj@course.atfr3.mongodb.net/?retryWrites=true&w=majority&appName=course").then((data)=>{
    const course=Course.find().then((data)=>{
        console.log(data)
    }).catch((err)=>{
       console.log(403)
    })
    console.log("Connected")
})
// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const nameSchema = new mongoose.Schema({
    team:{
        type:String,
        default:""
    },
    score:{
        type:Number,
        default:""
    }
})

const Course= mongoose.model("contact",nameSchema)

app.post("/name",(req,res)=>{

    const newData={
       team:req.body.team,
       score:req.body.score,

    }
   Course.insertMany(newData).then((data)=>{
        res.status(200).json("Data Inserted")
    }).catch((err)=>{
        res.status(403)
    })
})

app.patch("/name",(req,res)=>{
    const team=req.body.team;
    const score=req.body.score;
    Course.updateMany({team:team},{score:score}).then((Data)=>{
        res.status(200).json("updated")
    }).catch((Err)=>{
        res.status(400).json(Err)
    })
})

app.get("/name",(req,res)=>{
    Course.find().then((data)=>{
        res.status(200).json(data)
    }).catch((err)=>{
        res.status(400).json(err)
    })
})

let teamA= 0;
let teamB=0;
app.get("/find/:winner?",(req,res)=>{
  try{
    if(!req.params.winner){
        Course.find().then((data)=>{
            res.status(200).json(data);
        }
    ).catch((err)=>{
        console.log(err)
    })

    }
    else{
    console.log(req.params.winner);
    Course.find().then((data)=>{
       
        data.map((dataa)=>{
            if(dataa.team== "A"){
                teamA = teamA + dataa.score
            }
            else{
                teamB = teamB + dataa.score
            }
        }
        )
        if(teamA>teamB){
            res.status(200).json({message:"A is Winner"});
            
        }
        if(teamA<teamB){
            res.status(200).json({message:"B is Winner"});
        }
        else{
            res.status(200).json({message:"match drawn"});
        }
        teamA=0;
            teamB=0;
    });
}
}
  
catch(err){
    res.status(400).json(err)
}
  })



  app.delete("/name/:id",(req,res)=>{
    const id = req.params.id;
    Course.findByIdAndDelete(id).then((Data)=>{
        res.status(200).json(id)
    }).catch((err)=>{
        res.status(400).json(err)
    })
  })