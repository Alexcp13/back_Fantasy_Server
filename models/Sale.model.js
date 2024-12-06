import mongoose, { Schema, model } from "mongoose";

const saleSchema = new Schema({
    watch: { type: mongoose.Schema.Types.ObjectId, ref: 'watches', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    points: { type: Number, required: true },
}, {
    timestamps: true,
    collection: 'sales',
});

export const Sale = model('sales', saleSchema);
