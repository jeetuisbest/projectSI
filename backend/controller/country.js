
const data = require("../../data.json")
const fs = require("fs")
const path = require("path")
const joi = require("joi")

var multer = require('multer')






// const file = require(data);


exports.countries= async(req , res)=>{

    res.status(200).json(data)

}

exports.country= async(req , res)=>{
   

    // console.log("req.params.country-id",req.params.country-id)

    // res.status(200).json(data)
 var countryId = req.params.countryId;

  let found = false;
   for(let CountryData of data.countries){
    if(countryId == CountryData.id){
        found = true;
        res.status(200).json(CountryData)
        break;
    }
        }
        if(!found){
            res.status(200).json("data not found")
        }
   }



exports.add = async(req , res)=>{

    const storage = multer.diskStorage({
        filename: (req, file, cb) => {
            // const extArray = file.originalname.split('.');
            // const extension = extArray[extArray.length - 1];
            cb(null, `${file.originalname}`);
        },
        destination: '/images',
    });
    
    const uploads = multer({ storage , limits: { fileSize: 40960 } ,fileFilter: function(_req, file, cb){checkFileType(file, cb);}}).single('profile-file');
    
    function checkFileType(file, cb){
        // Allowed ext
        const filetypes = /jpg|png/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
      
        if(mimetype && extname){
          return cb(null,true);
        } else {
          cb('Error: Images Only!');

          res.status(401).json({error : "Images Only!"})
         
        }
      }
  
// upload.single('profile-file')

 uploads(req,res,(e)=>{
     if(e){
        console.log("error" , e)
     }else {
        // res.status(200).json({success:"details are uploaded"}) 
        let tempData = data; 
        

        req.body.flag = req.file.path
        console.log("reqFile" , req.file)

    console.log("reBody" , req.body)

   

        const schema = joi.object({
            id:joi.number(),
            name: joi.string().min(3).max(30).required(),
            continents : joi.string() ,
            rank : joi.number(),
            flag : joi.string()

        })

       const {error} = schema.validate(req.body);

       if(error){
           console.log(error)
           res.status(401).json("please enter correct filelds")
       }
       else{
        let reqData = JSON.parse(JSON.stringify(req.body))

        tempData.countries.push(reqData)
        fs.writeFile ("../data.json", JSON.stringify(tempData , null , 4), function(err) {
            if (err) throw err;
            console.log('complete');
            res.json(tempData)
            }
        );
         }
       }


   

     
    
 })

    
}