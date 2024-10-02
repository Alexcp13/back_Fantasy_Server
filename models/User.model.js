import { Schema, model } from "mongoose"
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
        required: [true, 'Username required']
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

},
    {
        timestamps: true,
        collections: 'users'
    }
)



userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

export const User = model('users', userSchema)