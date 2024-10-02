import { Schema, model } from 'mongoose';


const messageSchema = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    points: {
        type: Number,
        required: [true, 'Point is required']

    }
},
    {
        timestamps: true,
        collection: 'notifications'
    }
)


export const Notification = model('Notification', messageSchema);