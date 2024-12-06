import mongoose, { Schema, model } from "mongoose";


const watchSchema = new Schema({

    brand: {
        type: String,
        required: [true, 'Brand is required'],
    },
    model: {
        type: String,
        unique: true,
        required: [true, 'Model is required']
    },
    caseMaterial: {
        type: String,
        default: 'Stainless Steel'
    },
    strapMaterial: {
        type: String,
        required: [true, 'Strap material is required']
    },
    crystalMaterial: {
        type: String,

        default: 'Sapphire'
    },
    points: {
        type: Number,
        required: [true, 'Points are required']
    },

    watchImg: {
        type: String,
        required: [true, 'Image is required']
    },


},
    {
        timestamps: true,
        collection: 'watches'
    })



export const Watches = model('watches', watchSchema);
