import { Schema, model, mongoose } from 'mongoose';


const messageSchema = new Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
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