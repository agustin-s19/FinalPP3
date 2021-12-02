const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();


//CREATE


router.post("/addProduct", async (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        categories: req.body.categories,
        color: req.body.color,
        price: req.body.price,
        inStock: req.body.inStock
    })


    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
        console.log(newProduct);
        console.log(savedProduct);
    }catch(err){
        res.status(500).json(err);
        
    }
})

//UPDATE 

router.put("/:id", async (req, res) => {

    try{
        const updatedProduct = await Product.findByIdAndUpdate(
         req.params.id, 
         {
            price: req.body.price,
            inStock: req.body.inStock
         },
        );
        res.status(200).json(updatedProduct);
    } catch (err) { 
        res.status(500).json(err);

    }
});

//DELETE

router.delete("/:id", async (req,res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("El producto ha sido eliminado")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET PRODUCT

router.get("/find/:id", async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json({product});
    }catch(err){
        res.status(500).json(err)
    }
})


//GET ALL PRODUCTS

router.get("/", async (req,res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1)
        }else if(qCategory){
            products = await Product.find({categories:{
                $in: [qCategory],
            },
        });
        }else{
            products = await Product.find();
        }
        


        res.status(200).json({products});
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;