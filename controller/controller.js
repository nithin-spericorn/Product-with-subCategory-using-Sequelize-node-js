const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;




module.exports = {
    addproduct:async(req,res)=>{
    try{
         const productname=req.body.productname
         
         const result = await db.product.findOne({where:{productname:productname}})
        
         if(result){
            return res.status(400).json({
                success: false,
                message: "product already exist",
              })
         }else{
            
             const result= await db.product.create({productname:productname,subCatId:req.body.subCatId})
             console.log("p")
             return res.status(200).json({
                success: true,
                message: "product successfully created",
              });
         }

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "something wrong",
          });
    }
    },
    addcategory:async(req,res)=>{
        console.log("hai")
        try{
             const mainCat=req.body.mainCategory
             const subCat=req.body.subCategory
             const result = await db.subCat.findOne({where:{categoryname:subCat}})
             if(result){
                return res.status(400).json({
                    success: false,
                    message: "category already exist",
                  })
             }else{
                const result= await db.mainCat.create({categoryname:mainCat})
                 if(result){
                     await db.subCat.create({categoryname:subCat,mainCatId:result.mainCatId})
                 
                 return res.status(200).json({
                    success: true,
                    message: "category successfully created",
                  });
                }
             }
    
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "something wrong",
              });
        }
        },
        getproduct:async(req,res)=>{
           try{
               
               const id=req.params.id
            
               const {productname,productId,subCatId}=await db.product.findOne({where:{productId:id}})
               
               const  {categoryname,mainCatId}=await db.subCat.findOne({where:{subCatId:subCatId}})
               console.log(id,mainCatId)
              const mc=await db.mainCat.findOne({where:{mainCatId:mainCatId}})
               
               return res.status(200).json({
                success: true,
                message: {productId,productname,"subcategory":categoryname,"maincategory":mc.categoryname},
              });

           }catch(error){
                      return res.status(500).json({
                              success: false,
                             message: "something wrong",
                                                  });
           }
        }
      
  
      

}