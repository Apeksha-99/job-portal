import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        requirements:[{
            type: String,
        }],
        salary:{
            type: Number,
            required: true
        },
        location:{
            type: String,
            required: true
        },
        JobType:{
            type: String,
            required: true
        },
        position:{
            type:Numbeer,
            requirement: true
        },
        company:{
            type:mongoose.Schema.Type.objectId,
            ref:'Company'
        },
        CreatedBy:{
            type:mongoose.Schema.Type.objectId,
            ref:'User',
            required: true
        },
        applications:[{
            type:mongoose.Schema.Type.objectId,
            ref:'Application',
        }]  
    },
    {timestamps:true})

    export const Job = mongoose.model('Job',jobSchema)