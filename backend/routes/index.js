const express = require("express");
const router = express.Router()
const {countries,country,add} = require("../controller/country")


router.get("/countries" , countries) 
router.get('/country/:countryId', country);
router.post('/country', add);




module.exports=router;