import express from "express";
const app= express();
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage= multer.diskStorage({
    destination:function(req,file,cb){
         cb(null,path.join(__dirname,'src/uploads/'))
    },
    filename:function(req, file,cb){
        const name=Date.now()+'-'+file.originalname;
        cb(null,name)
    }

})

const upload= multer({storage:storage,
fileFilter:function(req, file, cb){
  if(file.mimetype=='image/png'||file.mimetype=='image/jpg'){
       cb(null, true)
  }
  else{
    console.log("only jpg and png are supported")
    cb(null, false)
  }

}, 
limits:{
    fileSize:1024*1024*2
}
})



app.post('/profile',upload.single('avatar'),function(req, res,next){
    res.send("upload done")
})




app.listen(1000,()=>{
    console.log("console is running at 1000")
})