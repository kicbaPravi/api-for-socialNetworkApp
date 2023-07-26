import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    friendsNumber: {
        type: Number,
        default: 0
    },
    friends: {
        type: [String]
    }
}, { timestamps: true });
export default mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map