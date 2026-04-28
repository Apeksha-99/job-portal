import mongoose, {Schema} from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },
    application:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
},{timestamps:true})

export const Application = mongoose.model('Application',ApplicationSchema)