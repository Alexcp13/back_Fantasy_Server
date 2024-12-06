import { Schema, model, mongoose } from "mongoose"
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email required']
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [2, 'Password should have minimun 2 characters'],
        maxlength: [25, 'Password should have maximun 25 characters']
    },
    username: {
        type: String,
        required: [true, 'User Name required']
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },

    points: {
        type: Number,
        default: 0
    },
    myWatches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'watches' }],
    lastOpened: { type: Date, default: null }

},
    {
        timestamps: true,
        collection: 'users'
    }
)



userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

export const User = model('users', userSchema)