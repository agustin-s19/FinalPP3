const mongoose = require("mongoose")
const OrderSchema = new mongoose.Schema(
    {
        // userId: {type: String, required: true},
        // products: [
        //     {
        //         productId:{
        //             type:String
        //         },
        //         quantity:{
        //             type:Number,
        //             default: 1
        //         },
        //     },
        // ],
        amount: { type:Number, required: true},
        // address:{ type:Object, required: true },
        status:{ type: String, default: "pending" },
        payment_id :{type: Number, required: false, default: null},
        preference_id: {type: String, required: true},
        items: {type: Array, required: true},
        
        
    },{ timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema);