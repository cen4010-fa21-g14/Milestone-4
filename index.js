const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const timeout = require("connect-timeout");
const path = require("path");
const multer = require("multer");




dotenv.config();

// mongoose.connect(process.env.MONGO_URL,
//         {useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true},
//         ()=>{
//     console.log("Connected to MongoDB")
// });

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
     })   
 .then(() => console.log("Connected to MongoDB!"))
 .catch(err => console.log(err));

 app.use("/images", express.static(path.join(__dirname,"public/images")));

//Middleware
app.use(timeout('10s'));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images")
  },
  filename: (req,file,cb)=>{
    cb(null, req.body.name);
  }

})

const upload = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try{
    return res.status(200).json("file uploaded successfully")
  }catch(err){
    console.log(err)
  }
})


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.use(express.static('distantly-near-main/build'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'distantly-near-main/build', 'index.html'));
});


const port = process.env.PORT || 8800;

app.listen(port,()=>{
    console.log("Backend server is running on port", port);
})


