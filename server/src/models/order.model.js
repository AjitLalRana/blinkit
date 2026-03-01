import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    orderId:{
        type: String,
        required: [true, "Order ID is required"],
        unique: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required"]
    },
    product_details: {
        name: String,
        image: Array,
    },
    paymentId:{
        type: String,
        default: ""
    },
    payment_status:{
        type: String,
        default: "pending"
    },
    delivery_address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ""
    }

},{
    timestamps: true
})

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;